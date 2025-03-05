// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// export const Appbar = () => {
//   const navigate = useNavigate();
//   const [showLogout, setShowLogout] = useState(false);
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="shadow h-14 flex justify-between ">
//       <div className="flex flex-col justify-center h-full ml-4">Paytm App</div>
//       <div className="flex">
//         <div className="flex flex-col justify-center h-full mr-4">Hello</div>
//         <div
//           className="rounded-full h-12 w-12 bg-slate-200 flex justify-center cursor-pointer relative"
//           onMouseEnter={() => setShowLogout(true)}
//           onMouseLeave={() => setShowLogout(false)}
//         >
//           <span className=" text-xl">U</span>
//           {showLogout && (
//             <div
//               className="absolute top-14 right-0 bg-white shadow-lg border rounded-md px-4 py-2 text-sm cursor-pointer"
//               onClick={handleLogout}
//             >
//               Logout
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to Sign In page
  };

  return (
    <div className="shadow h-14 flex justify-between px-4 items-center bg-white">
      <div className="text-lg font-semibold">Paytm App</div>
      <div className="flex items-center relative">
        <div className="mr-4">Hello</div>
        {/* Avatar */}
        <div
          className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center cursor-pointer relative"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={setTimeout(() => setShowLogout(false), 5000)}
        >
          <span className="text-xl">U</span>
          {/* Logout Dropdown */}
          {showLogout && (
            <div
              className="absolute top-14 right-0 bg-white shadow-lg border rounded-md px-4 py-2 text-sm cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
