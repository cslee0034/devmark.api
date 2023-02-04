import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { ModalContext } from "../App";

// Interfaces
interface Get {
  Error: any;
  box: string;
  img: string;
  length: number;
  i: number;
  [index: number]: any;
  boxId: string;
  memoArr: any;

  memoName: string;
  memoContent: string;
}

interface Delete {
  Error: any;
  memoId: string;
}

interface P {}

// React Start from here
const AlarmMain: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...

  /* Modal Context */
  const { setModalContent } = useContext(ModalContext);

  /* Memo State */
  const [alarms, setAlarms] = useState<any>([]);

  const alarmDelete = (e: any, alarmId: string) => {
    e.preventDefault();
    /* Delete Confirm */
    if (!window.confirm("Are you sure to delete?")) {
      return;
    }
    /* Delete Alarm */
    deleteAlarm(alarmId);
    /* Reload */
    window.location.replace("/alarms");
  };

  //--------------------------------------------------------
  // Axios Request

  /* <Axios Request> - Memo Axios Get /api/box -- Get All */
  const getAlarms = async () => {
    try {
      await axios.get<Get>("/api/alarm").then((res) => {
        let newAlarm: Array<any[]> = [];
        for (let i = 0; i < res.data.length; i++) {
          const alarmName: string = res.data[i].alarmName;

          /* Date 포멧 형식 변환 */
          const time: Date = res.data[i].time;
          let date = new Date(time);
          date.toLocaleDateString();
          let newDate = date.toString();

          const alarmId = res.data[i].id;

          newAlarm.push([alarmName, newDate, alarmId]);
          // [boxName, boxUrl, boxId] 형태로 Array에 저장 후 setState
          setAlarms(newAlarm);
          console.log(alarms);
        }
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
      if (error.response.data.Error) {
        setModalContent({
          header: "ERROR",
          message: error.response.data.Error,
          toggle: "view",
        });
      }
    }
  };

  /* <Axios Request> - Memo Axios Delete /api/memo */
  const deleteAlarm = async (alarmId: string) => {
    try {
      await axios.delete<Delete>("/api/alarm", {
        data: {
          id: alarmId,
        },
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
      if (error.response.data.Error) {
        setModalContent({
          header: "ERROR",
          message: error.response.data.Error,
          toggle: "view",
        });
      }
    }
  };

  //--------------------------------------------------------
  /* Fetching Data */

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        await getAlarms();
      } catch (e) {
        console.error(e);
      }
    };

    fetchAlarms();
  }, []);

  //--------------------------------------------------------
  // return

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Check</th>
            <th scope="col">Name</th>
            <th scope="col">Alarm Time</th>
          </tr>
        </thead>

        {alarms ? (
          <>
            {alarms.map((alarm: any[], index: number) => (
              <tbody key={index}>
                <tr>
                  <th scope="row">
                    <button
                      className="alarm-check"
                      onClick={(e: any) => {
                        alarmDelete(e, alarm[2]);
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </th>
                  <td>{alarm[0]}</td>
                  <td>{alarm[1]}</td>
                </tr>
              </tbody>
            ))}
          </>
        ) : null}
      </table>
    </>
  );
};

export default AlarmMain;