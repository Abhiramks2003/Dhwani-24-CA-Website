import { useState, useEffect } from "react";
import { client } from "../sanityConfig.js";

async function getLeaderboard() {
  const leaderboard = await client.fetch('*[_type == "ambassador"]');
  console.log(leaderboard);
  return leaderboard;
}

export default function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);
  useEffect(() => {
    getLeaderboard().then((leaderboard) => {
      leaderboard.forEach((lb) => {
        lb.total_count = lb.ref_count + lb.share_score;
      });
      const sortedLeaderboard = leaderboard.sort((a, b) => b.total_count - a.total_count);
      setLeaderboard(sortedLeaderboard);
      setFilteredLeaderboard(sortedLeaderboard);
    });
  }, []);

  useEffect(() => {
    if (!leaderboard.length) return;
    const filteredLeaderboard = leaderboard.filter((lb) => {
      return lb.name.toLowerCase().includes(search.toLowerCase()) || lb.college.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredLeaderboard(filteredLeaderboard);
  }, [search]);

  return (
    <>
      <div className="font-odibee-sans h-full flex flex-col justify-center items-center gap-4 md:gap-12">
        {/* <div className="text-white mt-4">
          Drishti Website
        </div> */}
        <div className="w-5/6 flex flex-col items-center pt-4 gap-1 md:gap-4">
          <a href="https://www.drishti.cet.ac.in/" className="text-3xl font-medium text-white border rounded-xl px-4 py-2 self-start">Dhwani Website</a>
          <h2 className="text-3xl md:text-7xl font-medium text-white">Campus Ambassador</h2>
          <h2 className="text-xl md:text-6xl font-medium text-[#51A1AA]">Leaderboard</h2>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="w-5/6 h-12 md:h-20 rounded-lg text-black text-xl md:text-4xl pl-8" placeholder="Search College or Name" />
        <table className="table-auto text-white w-5/6 mb-20">
          <thead>
            <tr className="text-sm md:text-4xl border-b block">
              <th className="text-left pb-2 md:pb-4 w-40">Position</th>
              <th className="text-center pb-2 md:pb-4 w-64">Name</th>
              <th className="text-center pb-2 md:pb-4 w-[800px]">College</th>
              {/* <th className="text-right pb-2 md:pb-4">Score</th> */}
            </tr>
          </thead>
          <div className="w-full h-2 md:h-4"></div>
          <tbody className="bg-[#51A1AA17] rounded-lg backdrop-blur-lg block h-96 overflow-auto">
            {filteredLeaderboard.slice(0, 20).map((lb, index) => (
              <tr className="text-xs md:text-2xl text-white uppercase" key={index + lb.name}>
                <td className="text-left pl-8 py-4 w-40">{leaderboard.indexOf(lb) + 1}</td>
                <td className="text-center w-64">{lb.name}</td>
                <td className="text-center w-[800px]">{lb.college}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  )
}