import { Webhook } from "svix";
import User from "../models/User";

// API Controller function to manage clerk user with database

export const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    // Verify the webhook signature
    await whook.verify(JSON.stringify(body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    // Get data from the request body
    const { data, type } = req.body;

    // Switch case to handle different webhook events
    switch (type) {
      case "user.created":
        // Handle user creation
        const newUser = new User({
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.profile_image_url,
          resume: "",
        });
        await User.create(newUser);
        res.json({});
        break;
        break;

      case "user.updated":
        // Handle user update
        const updatedUser = await User.findByIdAndUpdate(
          {
            name: data.first_name,
            email: data.email_addresses[0].email_address,
            image: data.profile_image_url,
          },
          { new: true }
        );
        await User.findByIdAndUpdate(data.id, updatedUser);
        res.json({});
        break;

      case "user.deleted":
        // Handle user deletion
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;

      default:
        break;
    }
  } catch (error) {
    console.error("Error in clerkWebhook:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
