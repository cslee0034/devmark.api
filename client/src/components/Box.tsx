import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../App";

interface Get {
  Error: any;
  box: string;
  img: string;
  length: number;
  i: number;
  [index: number]: any;
}

const Box = (): JSX.Element => {
  const { setModalContent } = useContext(ModalContext);

  const [boxs, setBoxs] = useState<string[][]>([]);

  /* Modal */
  const addBox = () => {
    setModalContent({
      header: "Edit_Box",
      toggle: "view",
    });
  };

  /* Get Box */
  const getBox = async () => {
    try {
      await axios.get<Get>("/api/box/page").then((res) => {
        const newBox = [];
        for (let i = 0; i < res.data.length; i++) {
          const boxName = res.data[i].box;
          const boxUrl = res.data[i].img;
          const boxId = res.data[i].id;
          newBox.push([boxName, boxUrl, boxId]);
          setBoxs(newBox);
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getBox();
      } catch (e) {
        console.error(e);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {boxs ? (
        <div className="row row-cols-1 row-cols-md-4 g-4 mb-4 card-container">
          {boxs.map((box, index) => (
            <div className="col">
              <div className="add-card card h-100" key={index}>
                <img
                  src={`http://localhost:5000${box[1]}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">#{box[0]}</h5>
                </div>
              </div>
            </div>
          ))}
          <div className="col">
            <div className="add-card card h-100" onClick={addBox}>
              <img
                src={`${process.env.PUBLIC_URL}/images/add-item.png`}
                className="card-img-add"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Add Box</h5>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4 mb-4 card-container">
          <div className="col">
            <div className="add-card card h-100" onClick={addBox}>
              <img
                src={`${process.env.PUBLIC_URL}/images/add-item.png`}
                className="card-img-add"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Add Box</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Box;
