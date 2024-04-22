import { useState, useEffect } from "react";
import { client } from "../sanityConfig.js";
import title from "./assets/title.png";
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
      const sortedLeaderboard = leaderboard.sort(
        (a, b) => b.total_count - a.total_count
      );
      setLeaderboard(sortedLeaderboard);
      setFilteredLeaderboard(sortedLeaderboard);
    });
  }, []);

  useEffect(() => {
    if (!leaderboard.length) return;
    const filteredLeaderboard = leaderboard.filter((lb) => {
      return (
        lb.name.toLowerCase().includes(search.toLowerCase()) ||
        lb.college.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredLeaderboard(filteredLeaderboard);
  }, [search]);

  return (
    <>
      <div className="font-inter border-[1.2rem] border-[#EE5876] uppercase h-full flex flex-col justify-center items-center gap-4 md:gap-12">
        {/* <div className="text-white mt-4">
          Drishti Website
        </div> */}

        <div className="w-5/6 flex flex-col items-start pt-4 gap-1 md:gap-4">
          <a
            href="https://dhwani.cet.ac.in/"
            className="text-white border-2 shadow-black shadow-md -rotate-3 hover:rotate-0 ease-linear px-4 py-2 self-start bg-[#EE5876] border-black"
            target="_"
          >
            <img src={title} alt="" className="h-8 md:h-12" />
          </a>
          <h2 className="text-2xl md:text-7xl mt-3 font-extrabold text-white text1-mobile md:text1">
            Campus Ambassador
          </h2>
          <h2 className="text-xl md:text-6xl font-semibold text-[#51A1AA] mt-3 txt-stroke">
            Leaderboard
          </h2>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-4/6 h-12 md:h-14 rounded-lg uppercase placeholder:font-medium text-black text-sm md:text-2xl pl-2 md:pl-8"
          placeholder="Search College or Name"
        />
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
            {/* {filteredLeaderboard.slice(0, 20).map((lb, index) => (
              <tr className="text-xs md:text-2xl text-white uppercase" key={index + lb.name}>
                <td className="text-left pl-8 py-4 w-40">{leaderboard.indexOf(lb) + 1}</td>
                <td className="text-center w-64">{lb.name}</td>
                <td className="text-center w-[800px]">{lb.college}</td>
              
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}
