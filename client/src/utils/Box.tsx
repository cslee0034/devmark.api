import React, { useContext} from "react";
import { ModalContext} from "../App";

const Box = (): JSX.Element => {

  const { setModalContent } = useContext(ModalContext);

  const AddBox = () => {
    setModalContent({
      header: "Edit_Box",
      toggle: "view",
    });
  }


  return (
    <>
      {/* Content */}
      <div className="row row-cols-1 row-cols-md-4 g-4 mb-4 card-container">
        <div className="col">
          <div className="card h-100">
            <img
              src={`${process.env.PUBLIC_URL}/images/vanilla_js.png`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">#javascript</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src={`${process.env.PUBLIC_URL}/images/Frontpage-background.png`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">#algorithm</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src={`${process.env.PUBLIC_URL}/images/python.png`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">#python</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="add-card card h-100" onClick={AddBox}>
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
    </>
  );
};

export default Box;
