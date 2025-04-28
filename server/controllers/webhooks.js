import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook signature
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Get data from the request body
    const { data, type } = req.body;

    switch (type) {
      case "user.created":
        const newUser = new User({
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.profile_image_url,
          resume: "",
        });
        await newUser.save();
        res.json({});
        break;

      case "user.updated":
        await User.findByIdAndUpdate(
          data.id,
          {
            name: data.first_name + " " + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.profile_image_url,
          },
          { new: true }
        );
        res.json({});
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;

      default:
        res.status(400).json({ message: "Unhandled event type" });
        break;
    }
  } catch (error) {
    console.error("Error in clerkWebhook:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
