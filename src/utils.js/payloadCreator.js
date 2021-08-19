function generateCampaignPayload(formData, user) {
  const { selectedCause, image, ...campaignData } = formData;
  let rawPayload = {
    ...campaignData,
    endDate: {
      __type: "Date",
      iso: campaignData.endDate,
    },
    categoryRef: {
      __type: "Pointer",
      className: "CampaignCategory",
      objectId: selectedCause,
    },
    userRef: {
      __type: "Pointer",
      className: "_User",
      objectId: user.objectId,
    },
  };
  return rawPayload;
}

function generateCampaignImagePayload(campaignId, image) {
  return {
    objectId: campaignId,
    image: {
      __type: "File",
      name: image[0],
    },
  };
}

export { generateCampaignPayload, generateCampaignImagePayload };
