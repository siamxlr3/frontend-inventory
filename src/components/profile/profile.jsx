import React from "react";
import { useSelector } from "react-redux";
import {useGetProfileQuery} from "@/redux/feature/authAPI/authAPI.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, Shield, CheckCircle, Calendar } from "lucide-react";
import {Link, useNavigate} from "react-router-dom";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { data } = useGetProfileQuery(user.id);

    const profile = data?.data;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-2xl rounded-2xl shadow-xl">
                <CardContent className="p-6">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={profile?.image}
                            alt={profile?.name}
                            className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md object-cover"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold capitalize">{profile?.name}</h2>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                {profile?.role_name.toUpperCase()}
                            </p>
                            <p className="text-gray-500 text-sm capitalize">Status:
                                <span className="ml-1 font-medium text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> {profile?.status}
                </span>
                            </p>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                            <Mail className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-700">{profile?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                            <Phone className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{profile?.contact}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                            <User className="w-5 h-5 text-purple-500" />
                            <span className="text-gray-700 capitalize">{profile?.gender}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                            <Calendar className="w-5 h-5 text-orange-500" />
                            <span className="text-gray-700">
                Joined {new Date(profile?.createdAt).toLocaleDateString()}
              </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                        <Link to='/update-profile'>
                            <Button className="px-6 py-2 rounded-xl shadow">Edit Profile</Button>
                        </Link>
                            <Button className="px-6 py-2 rounded-xl shadow">Delete Profile</Button>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
