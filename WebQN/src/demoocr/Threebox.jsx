import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    // width: "100%",
    margin: "100px",
  },
});

const ThreeBoxes = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [xmlRawText, setXmlRawText] = useState("");
  //compare
  // const [text1, setText1] = useState("");
  // const [text2, setText2] = useState("");
  // const [correct, setCorrect] = useState(false);
  // const [uncorrect, setUncorrect] = useState(false);

  // const [doc_no, setDocNo] = useState('');
  // const [doc_date, setDocDate] = useState('');
  // const [doc_signer, setDocSigner] = useState('');

  const handleClick = () => {
    setLoading(true);
    // perform some async action
    setTimeout(() => {
      (() => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlRawText, "text/xml");
        if (xmlDoc.getElementsByTagName("no").length === 0) {
          alert("Chưa có số công văn");
          return;
        }
        if (xmlDoc.getElementsByTagName("date").length === 0) {
          alert("Chưa có ngày giờ");
          return;
        }
        if (xmlDoc.getElementsByTagName("signer").length === 0) {
          alert("Chưa có người ký");
          return;
        }
        // console.log("prop doc no:", props.doc_no);
        // return;
        if (
          props.doc_no.trim() ===
          xmlDoc.getElementsByTagName("no")[0].childNodes[0].nodeValue.trim()
        )
          console.log("Số công văn khớp");
        else {
          alert("Số công văn không khớp");
          return;
        }
        if (
          props.doc_date.trim() ===
          xmlDoc.getElementsByTagName("date")[0].childNodes[0].nodeValue.trim()
        )
          console.log("Ngày giờ khớp");
        else {
          alert("Ngày giờ không khớp");
          return;
        }
        if (
          props.doc_signer.trim() ===
          xmlDoc.getElementsByTagName("signer")[0].childNodes[0].nodeValue.trim()
        )
          alert("Các trường thông tin đều khớp");
        else {
          alert("Tên người ký không khớp");
          return;
        }

        //xmlDoc.getElementsByTagName("no")[0].childNodes[0].nodeValue
      })();
      setLoading(false);
    }, 250);
  };

  //check
  // const handleText1Change = (event) => {
  //   setText1(event.target.value);
  //   setCorrect(event.target.value === text2);
  //   setUncorrect(event.target.value !== text2);
  // };

  // const handleText2Change = (event) => {
  //   setText2(event.target.value);
  //   setCorrect(event.target.value === text1);
  //   setUncorrect(event.target.value !== text1);
  // };

  return (
    <div className={classes.root}>
      <Box
        p={2}
        bgcolor="#E1FABA"
        color="primary.contrastText"
        width="20em"
        height="30em"
        border="2px solid black"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h3 style={{ color: "red", marginBottom: "20px" }}>Kết quả OCR</h3>
          <TextField
            value={props.doc_no}
            onChange={(e) => {
              props.setDocNo(e.target.value);
            }}
            placeholder="Số công văn"
            variant="outlined"
            style={{
              border: "2px solid blue",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          />
          <TextField
            value={props.doc_date}
            onChange={(e) => {
              props.setDocDate(e.target.value);
            }}
            placeholder="Thời gian ban hành"
            variant="outlined"
            style={{
              border: "2px solid blue",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          />
          <TextField
            value={props.doc_signer}
            onChange={(e) => {
              props.setDocSigner(e.target.value);
            }}
            placeholder="Người ký"
            variant="outlined"
            style={{ border: "2px solid blue", borderRadius: "6px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        ></div>
      </Box>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          height: "100px",
          marginTop: "auto",
          marginBottom: "auto",
        }}
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? <CircularProgress size={81.5} /> : "Thẩm định"}
      </Button>
      <Box
        p={2}
        bgcolor="#95E4E1"
        color="secondary.contrastText"
        width="20em"
        border="2px solid black"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <TextField
            value={xmlRawText}
            onChange={(e) => {
              setXmlRawText(e.target.value);
            }}
            label="Đầu vào XML"
            variant="outlined"
            color="secondary"
            placeholder="Enter XML here"
            style={{ marginTop: "10px" }}
            fullWidth
            multiline
          />
        </div>
      </Box>
      <Box
        p={2}
        bgcolor="#95E4E1"
        color="secondary.contrastText"
        width="20em"
        border="2px solid black"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <TextField
            label="Đầu vào Json"
            variant="outlined"
            color="secondary"
            placeholder="Enter Json here"
            style={{ marginTop: "10px" }}
            fullWidth
            multiline
          />
        </div>
      </Box>
    </div>
  );
};

export default ThreeBoxes;
