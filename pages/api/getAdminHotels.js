import { withIronSession } from "next-iron-session";
import { HotelDB } from "../../util/hotel_db";
import { UserDB } from "../../util/user_db";
async function handler(req, res){
    const admin = req.session.get("user");
    if(admin.admin.status == false){
        res.redirect('/loginForm')
    }
    let hotels = UserDB.getAdminHotels(admin.username);
    if(!hotels){
        res.status(400).json({error: "Hotel or User not Found"})
    }
    let success = hotels.map(HotelDB.findHotelByName)
    res.status(200).json(success)
}

export default withIronSession(handler, 
    {
        cookieName: "hotel-cookie",
        cookieOptions: {
          secure: process.env.NODE_ENV === "production" ? true : false
        },
        password: process.env.APPLICATION_SECRET
      });