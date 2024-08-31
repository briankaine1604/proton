"use server";
import axios from "axios";

const apiKey = process.env.newletterToken!;
const groupId = process.env.groupId!;

const apiUrl = "https://connect.mailerlite.com/api/subscribers";

export const addSubscriber = async (data: any) => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        email: data.email,
        fields: data.fields,
        groups: [groupId],
        status: data.status || "active",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("Subscriber added:", response.data);
    return {
      success: "You've subscribed to our newsletter!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error response data:", error.response.data);
    return { error: "Oops! Something went wrong. Please try again" };
  }
};
