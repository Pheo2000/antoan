import React, { useEffect, useState } from "react";
import { domain } from "../dangtuyendung/DangtuyendungContainer";
import Hsut from "./Hsungtuyen";

const HsungtuyenContainer: React.FC = () => {
  const [HsutList, setHsutList] = useState<any[]>([]);
  const handlerHsut = async () => {
    await fetch(`http://${domain}/api/listprofile/get?company=3&status=1`)
      .then(async (res) => await res.json())
      .then((data) => setHsutList(data));
  };

  const handlerClose = async (idj: number, idu: number) => {
    const closeJob = {
      idJob: idj,
      idUser: idu,
      status: 4,
    };
    await fetch(`http://${domain}/api/listprofile/status`, {
      method: "POST",
      body: JSON.stringify(closeJob),
      headers: { "Content-Type": "application/json" },
    });
    await fetch(`http://${domain}/api/listprofile/get?company=3&status=1`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => await res.json())
      .then((data) => setHsutList(data));
  };

  const handlerCheck = async (idj: number, idu: number) => {
    const checkJob = {
      idJob: idj,
      idUser: idu,
      status: 2,
    };
    await fetch(`http://${domain}/api/listprofile/status`, {
      method: "POST",
      body: JSON.stringify(checkJob),
      headers: { "Content-Type": "application/json" },
    });
    await fetch(`http://${domain}/api/listprofile/get?company=3&status=1`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => await res.json())
      .then((data) => setHsutList(data));
  };
  useEffect(() => {
    handlerHsut();
  }, []);
  return (
    <Hsut
      HsutList={HsutList}
      handlerClose={handlerClose}
      handlerCheck={handlerCheck}
    />
  );
};

export default HsungtuyenContainer;
