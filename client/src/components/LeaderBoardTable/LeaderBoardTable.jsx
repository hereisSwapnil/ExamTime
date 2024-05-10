import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderBoardTable = () => {

    const [leaderData,setLeaderData]=useState([]);


    const fetchLeaderData=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/user/leaderboard`)

            if(response.status === 200){
                setLeaderData(response.data);
                console.log(response.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchLeaderData()
    },[])

    

  return (
    <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Profile Photo</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Coins</th>
            <th className="px-4 py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {leaderData.map((user, index) => (
            <tr
              key={user._id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-gray-200 transition-colors duration-200`}
            >
              <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-300">
                <img src={user.userPhoto} alt={user.username} className="w-8 h-8 rounded-full" />
              </td>
              <td className="px-4 py-2 border border-gray-300">{user.username}</td>
              <td className="px-4 py-2 border border-gray-300">{user.coins}</td>
              <td className="px-4 py-2 border border-gray-300">{user.notes.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default LeaderBoardTable;