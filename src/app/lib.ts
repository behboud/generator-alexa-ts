import axios from "axios";
const SMAPI_ENDPOINT = "https://api.amazonalexa.com/v0";

export async function createNewSkill({ token, vendorId, skillName }) {
  try {
    axios.request({
      method: "POST",
      url: SMAPI_ENDPOINT + "/skills",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      data: {
        vendorId
      }
    });
  } catch (error) {
    console.error(error);
  }
}
