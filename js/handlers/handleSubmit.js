import { fetchTrackingInfo } from "../../api/index.js";
import { showLoadingTracking, trackerOrderFoundUpdate } from "../components/TrackedOrder.js";
import { messages } from "../config/messages.js";
import { validateTrackingCode } from "../helpers/validation.js";

export async function handleSearchByCodeSubmit(code = "") {
  showLoadingTracking();

  if (!validateTrackingCode(code)) {
    trackerOrderFoundUpdate(null, messages.invalidCode);
    return;
  }

  try {
    const info = await fetchTrackingInfo(code);

    if (info && Array.isArray(info.data) && info.data.length > 0) {
      trackerOrderFoundUpdate(info.data);
    } else {
      trackerOrderFoundUpdate(null, messages.notFound);
    }
  } catch (error) {
    console.error('Error fetching tracking info:', error);
    trackerOrderFoundUpdate(null, messages.errorFetch);
  }
}