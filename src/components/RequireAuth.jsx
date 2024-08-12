/* eslint-disable react/prop-types */

import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {UrlState} from "@/Context";
import {BarLoader} from "react-spinners";

function RequireAuth({children}) {
  const navigate = useNavigate();

  const {isAuthenticated} = UrlState();

  useEffect(() => {
    if (!isAuthenticated  ) navigate("/auth");
  }, [isAuthenticated]);

  // if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;

  if (isAuthenticated) return children;
}

export default RequireAuth;