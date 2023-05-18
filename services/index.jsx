import axios from "axios";

const BASE_URL = "https://dev-api.wall.app";

export const fetchCampaignList = async (limit, tag, search) => {
    const resp = await axios.get(`${BASE_URL}/api/v1/core/campaigns?limit=${limit}&offset=1&campaign_tag=${tag}&search=${search}`)
    return resp
}
