import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";

import { getDialoguesService } from "../services/dialogueService";

export const useGetDialogues = (dep1, dep2) => {
  const { user, getUser } = useStateContext();

  const [dialogues, setDialogues] = useState([]);

  useEffect(() => {
    if (!user._id) {
      getUser(sessionStorage.getItem("username"));
    }

    const fetchDialogues = async () => {
      try {
        if (user._id) {
          const data = await getDialoguesService("/dialogue/" + user?._id);
          setDialogues(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDialogues();
  }, [user._id, dep1, dep2]);

  return { dialogues };
};
