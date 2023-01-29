import axios from 'axios';

export default async (req, res) => {
    console.log("vehicles API called")
    const response = await axios.get('http://127.0.0.1:8000/vehicles?limit=20&direction=desc&sort=created_at&type=make&value=Toyota&last_id=start');
    const vehicles = response.data;

    return res.json(vehicles);
}
