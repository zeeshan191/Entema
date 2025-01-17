// eslint-disable-next-line
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Select from "@material-ui/core/Select";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
    width: "100%",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

export default function PopupPO(props) {
  const { setId, id, openPopup, setOpenPopup } = props;

  const classes = useStyles();

  const [podocno, setPodocno] = useState();
  const [podate, setPodate] = useState();
  const [porevno, setPorevno] = useState();
  const [ponumber, setPonumber] = useState();
  const [poquotationref, setPoquotationref] = useState();
  const [poproject, setPoproject] = useState();
  const [popaymentmode, setPopaymentmode] = useState();
  const [povendor, setPovendor] = useState();
  const [pocode, setPocode] = useState();
  const [pophone, setPophone] = useState();
  const [pocpperson, setPocpperson] = useState();
  const [pomobile, setPomobile] = useState();
  const [poemail, setPoemail] = useState();
  const [povat, setPovat] = useState();
  const [poadd, setPoadd] = useState();
  const [postartdate, setPostartdate] = useState();
  const [poenddate, setPoenddate] = useState();
  const [polocation, setPolocation] = useState();
  const [pomobilizationdate, setPomobilizationdate] = useState();
  const [podesc, setPodesc] = useState();
  const [pototal, setPototal] = useState(0);
  const [pogst, setPogst] = useState(0);
  const [pograndtotal, setPograndtotal] = useState(0);
  const [vatDetails, setVatDetails] = useState();

  const [instruction, setInstruction] = useState(
    "1. Payment shall be made for the quantities executed as per unit rates given above. \n2. Work Order number and date must be quoted on all correspondence. \n3. This order is subject to the terms and conditions set out on the face and Annexure -A \n4. The acceptance copy must be signed by vender or by its representative ( on vender’s behalf) on the face and Annexure - A \n 5. This Work Order is subject to the cancellation unless the subcontractor returns one copy signed with confirmation that all terms and conditions are accepted. \n 6. The following attachments form an integral part of this work Order."
  );
  const [deliveryTerms, setDeliveryTerms] = useState(
    "1. Lubricants, top-up oil, repairs, daily maintenance, Service and Consumables of the Equipments shall be provide by Vender. \n2. In case of breakDown or Maintenance, Vwndor/Supplier shall provide a replacement of equipment immediatly at no extra cost."
  );
  const [conditionTerms, setConditionTerms] = useState(
    "1. Above rate is applicable for 10 hours per day, 6 days a week, 260 hours per Month. \n2. Working Duration: 2 Month Extandable. \n3. Supply Food, accommodation & Transportation scope Entema al-shamal. \n4. Above Rate is exclusive of VAT. \n5. If you need any clarification on above matter or any assistance please feel free to contract undersigned. \n6. Vendor has to return the same purchase order to Entema Al-shamal by Fax or Email after Confirmation Signature."
  );

  const [vendorLov, setVendorLov] = useState([]);
  const [sigName, setSigName] = useState();
  // const [sigNameNTitle,setSigNameNTitle] = useState();

  const userTemplate = {
    description: "",
    unit: "",
    qty: "",
    unit_rate: "",
    amount: "",
  };

  const [orderItem, setOrderItem] = useState([]);

  const optionUnit = [
    { key: "", value: "" },
    { key: "Month", value: "Month" },
    { key: "Week", value: "Week" },
    { key: "Day", value: "Day" },
    { key: "Hour", value: "Hour" },
  ];

  let newData = [];
  let test = [];

  useEffect(() => {
    axios
      .post("http://entemadb.entema-software.com/getPODataBasedOnId", {
        poid: id,
      })
      .then((res) => {        
        ///setNewData(res.data[0]);
        if (res.data.length > 0) {
          console.log("BROO :: ", res.data);
          setPodate(res.data[0].CREATED_DATE);
          setPodocno(res.data[0].DOC_NO);
          setPorevno("REV - "+res.data[0].SEQ_NO);
          setPonumber("PO - "+res.data[0].SEQ_NO);
          setPoquotationref(res.data[0].WO_QUO_REF);
          setPoproject(res.data[0].WO_PROJECT);
          setPopaymentmode(res.data[0].WO_PAYMENT_MODE);
          setPovendor(res.data[0].VI_VENDOR);
          setPocode(res.data[0].VI_CODE);
          setPophone(res.data[0].VI_PH_NO);
          setPocpperson(res.data[0].VI_CONTACT_PERSON);
          setPomobile(res.data[0].VI_MOBILE);
          setPoemail(res.data[0].VI_EMAIL);
          setPovat(res.data[0].VI_VAT);
          setPoadd(res.data[0].VI_ADDRESS);
          setPostartdate(res.data[0].WS_START_DATE);
          setPoenddate(res.data[0].WS_END_DATE);
          setPolocation(res.data[0].WS_LOC);
          setPomobilizationdate(res.data[0].WS_MOB_DATE);
          setPodesc(res.data[0].WS_DESC);
          setPototal(parseInt(res.data[0].PO_TOTAL));
          setPogst(parseInt(res.data[0].PO_GST));
          setPograndtotal(parseFloat(res.data[0].PO_GRANDTOTAL));
          setSigName(res.data[0].VENDOR_DISP_NAME);
          setInstruction(res.data[0].PO_INSTRUCTION)
          setConditionTerms(res.data[0].PO_TC);
          setDeliveryTerms(res.data[0].PO_TOD);
        }
      });

    axios
      .post("http://entemadb.entema-software.com/getMultirowPODataBasedOnId", {
        poid: id,
      })
      .then((res) => {
        newData = res.data;

        var x = newData.length;
        var rows = [];

        for (var i = 0; i < x; i++) {
          rows.push(userTemplate);

          test[i] = {
            description: newData[i].PO_DESC,
            unit: newData[i].UNIT_DD,
            qty: parseInt(newData[i].QUANTITY),
            unit_rate: parseInt(newData[i].UNIT_RATE),
            amount: parseInt(newData[i].UNIT_AMOUNT),
          };
        }
        setOrderItem(test);
      });
  }, [id]);

  const onChangeVendorDetails = (vendorID) => {
    //console.log("onchange value is : ", vendorID);
    let computedComments = vendorLov;
    //console.log("onchange computedComments is : ", computedComments);
    if (vendorID) {
      computedComments = computedComments.filter(
        (comment) => comment.VENDOR_ID === vendorID
      );
    }
    //console.log("data set value is : ", computedComments);
    //setPocode(computedComments[0].VENDOR_CODE);
    // setPophone(computedComments[0].VENDOR_PHONE);
    // setPocpperson(computedComments[0].VENDOR_CPERSON);
    // setPomobile(computedComments[0].VENDOR_PHONE);
    // setPoemail(computedComments[0].VENDOR_EMAIL);
    // setPovat(computedComments[0].VENDOR_VAT);
    // setPoadd(computedComments[0].VENDOR_ADD);
    //setSigName(computedComments[0].VENDOR_NAME);
    // console.log(computedComments[0].VENDOR_NAME);
    //setSigNameNTitle(computedComments[0].VENDOR_CPERSON);

    if (computedComments[0].VENDOR_VAT) {
      setPogst(vatDetails);
      onChangeGST(vatDetails);
    } else {
      setPogst(0);
      onChangeGST(0);
    }
  };

  const generateUniqueId = () => {
    let currentDate = new Date();
    let uniqueValue =
      "" +
      currentDate.getFullYear() +
      (currentDate.getMonth() + 1) +
      currentDate.getDate() +
      currentDate.getHours() +
      currentDate.getMinutes() +
      currentDate.getSeconds() +
      currentDate.getMilliseconds();
    //console.log("My unique Values :", uniqueValue);
    return uniqueValue;
  };

  const setDateFormat = () => {
    let currentDate = new Date();
    let currentYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      currentDate
    );
    let currentMonth = new Intl.DateTimeFormat("en", {
      month: "numeric",
    }).format(currentDate);
    let currentDay = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
      currentDate
    );

    //console.log(`${currentDay}-${currentMonth}-${currentYear}`);

    // let formatedDate = currentDay + "-0" + currentMonth + "-" + currentYear;

    let formatedDate;

    if (currentMonth in [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      formatedDate = currentYear + "-0" + currentMonth + "-" + currentDay;
    } else {
      formatedDate = currentYear + "-" + currentMonth + "-" + currentDay;
    }

    return formatedDate;
  };

  const getVendorLovData = () => {
    fetch("http://entemadb.entema-software.com/getVendorData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setVendorLov(response);
        axios.get("http://entemadb.entema-software.com/getVatDataOnID", {}).then((res) => {
          if (res.data.length > 0) {
            // console.log(res.data);
            setVatDetails(res.data[0].VAT);
          }
        });
      });
    return vendorLov;
  };

  useEffect(() => {
    getVendorLovData();
    setPodate(setDateFormat());

    let uniqueId = generateUniqueId();
    // //console.log("My unique Value :", uniqueId);
    setPodocno(uniqueId);
    setPorevno(uniqueId);
    // //console.log('turned : ', result);
  }, []);

  const addItem = () => {
    setOrderItem([...orderItem, userTemplate]);
  };

  const handleBlur = (e, index) => {
    //console.log("blurr on call e value : ", e);
    //console.log("blurr on call index value : ", index);

    if (e.target.name === "unit_rate") {
      if (orderItem[index].qty != "") {
        let amount = orderItem[index].qty * orderItem[index].unit_rate;

        const updatedUsers = orderItem.map((item, i) =>
          index === i ? Object.assign(item, { ["amount"]: amount }) : item
        );

        setOrderItem(updatedUsers);
      }
    } else if (e.target.name === "qty") {
      if (orderItem[index].unit_rate != "") {
        let amount = orderItem[index].qty * orderItem[index].unit_rate;

        const updatedUsers = orderItem.map((item, i) =>
          index === i ? Object.assign(item, { ["amount"]: amount }) : item
        );

        setOrderItem(updatedUsers);
      }
    }

    let test123 = 0;

    for (var i = 0; i < orderItem.length; i++) {
      test123 = test123 + parseInt(orderItem[i].amount);
    }

    let gtt = 0;
    let gt = 0;
    let cc = 0;

    if (pogst > 0) {
      gtt = test123 / 100;
      cc = gtt * pogst;

      // gtt = test123 / gstValue;
      gt = test123 + cc;
    } else {
      gt = test123;
    }

    setPototal(test123);
    setPograndtotal(gt);

    //  //console.log('blurr on call total amount value : ', test123);
    //  //console.log('blurr on call order item value : ', amount);
  };

  const calculationOnDeleteRow = (value) => {
    // console.log("calculationOnDeleteRow before if : ", value);

    if (orderItem.length > 0) {
      if (orderItem[value].amount !== "") {
        // console.log("OH HELLO TEHE", orderItem[value].amount);

        let excludeValue = orderItem[value].amount;
        // console.log("OH excludeValue TEHE", excludeValue);

        let tempPoTotal = pototal - excludeValue;

        setPototal(tempPoTotal);

        if (pogst > 0) {
          onChangeGST(pogst);
        } else {
          setPograndtotal(tempPoTotal);
        }
      }
    }
  };

  const onChangeGST = (gstValue) => {
    let gt = 0;
    if (pototal > 0) {
      let test123 = 0;

      for (var i = 0; i < orderItem.length; i++) {
        test123 = test123 + parseInt(orderItem[i].amount);
      }

      let gtt = 0;

      let cc = 0;

      if (gstValue > 0) {
        gtt = test123 / 100;
        cc = gtt * parseInt(gstValue);

        // gtt = test123 / gstValue;
        gt = parseInt(test123) + parseInt(cc);
      } else {
        gt = test123;
      }
    }
    setPograndtotal(gt);
  };

  const getArraySum = (a) => {
    var total = 0;
    for (var i in a) {
      total += a[i];
    }
    return total;
  };

  const changeHandler = (e, index) => {
    // //console.log("Check my index :", index);

    // //console.log(' target name :',e.target.name);

    const updatedUsers = orderItem.map((item, i) =>
      index === i
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    //console.log("newnew:", e.target.value);

    let test = updatedUsers.length - 1;

    if (e.target.name === "unit_rate") {
      //console.log("value of quamtity :", e);
      //console.log("value of quamtity bhaya :", updatedUsers[test].qty);
    }

    setOrderItem(updatedUsers);
  };

  const removeItem = (index) => {
    //console.log("index value :", index);
    const filteredUsers = [...orderItem];
    filteredUsers.splice(index, 1);

    setOrderItem(filteredUsers);

    onDelete(filteredUsers);
    //calculationOnDeleteRow(index);
  };

  const onDelete = (orderItem) => {
    let xGrndTotal = 0;
    let xTotal = 0;

    if (pototal > 0) {
      // console.log(orderItem);
      for (var i = 0; i < orderItem.length; i++) {
        xTotal = xTotal + parseInt(orderItem[i].amount);
      }
    }
    if (pogst > 0) {
      xGrndTotal = (pogst / 100) * xTotal;
      xGrndTotal += xTotal;
      // xGrndTotal = xGrndTotal * pogst;
    } else {
      xGrndTotal = xTotal;
    }
    // console.log("GRND TTAL: ", xGrndTotal);
    setPograndtotal(xGrndTotal);
    setPototal(xTotal);
  };

  const handleChangeEvent = (e, index) => {
    //console.log("e : ", e);

    const input = e.target.name;

    if (input === "podocno") {
      setPodocno(e.target.value);
    } else if (input === "podate") {
      setPodate(e.target.value);
    } else if (input === "porevno") {
      setPorevno(e.target.value);
    } else if (input === "ponumber") {
      setPonumber(e.target.value);
    } else if (input === "poquotationref") {
      setPoquotationref(e.target.value);
    } else if (input === "poproject") {
      setPoproject(e.target.value);
    } else if (input === "popaymentmode") {
      setPopaymentmode(e.target.value);
    } else if (input === "povendor") {
      setPovendor(e.target.value);
      onChangeVendorDetails(e.target.value);
    } else if (input === "pocode") {
      setPocode(e.target.value);
    } else if (input === "pophone") {
      setPophone(e.target.value);
    } else if (input === "pocpperson") {
      setPocpperson(e.target.value);
    } else if (input === "pomobile") {
      setPomobile(e.target.value);
    } else if (input === "poemail") {
      setPoemail(e.target.value);
    } else if (input === "povat") {
      setPovat(e.target.value);
    } else if (input === "poadd") {
      setPoadd(e.target.value);
    } else if (input === "postartdate") {
      setPostartdate(e.target.value);
    } else if (input === "poenddate") {
      setPoenddate(e.target.value);
    } else if (input === "polocation") {
      setPolocation(e.target.value);
    } else if (input === "pomobilizationdate") {
      setPomobilizationdate(e.target.value);
    } else if (input === "podesc") {
      setPodesc(e.target.value);
    } else if (input === "pototal") {
      setPototal(e.target.value);
    } else if (input === "pogst") {
      setPogst(e.target.value);
    } else if (input === "pograndtotal") {
      setPograndtotal(e.target.value);
    } else if (input === "instruction") {
      setInstruction(e.target.value);
    } else if (input === "deliveryTerms") {
      setDeliveryTerms(e.target.value);
    } else if (input === "conditionTerms") {
      setConditionTerms(e.target.value);
    } else if (["description", "unit", "qty", "unit_rate"].includes(input)) {
      //console.log("exceptional handling");
      changeHandler(e, index);
    }

    //console.log("log of order Items : ", orderItem);
  };

  // const submitMultiRowData = (formData) => {
  //   //console.log("onCall :", formData);
  //   axios
  //     .post("http://localhost:3009/insertRespForm", {
  //       taskList: formData,
  //     })
  //     .then((res) => {
  //       //console.log("updated Values Successfully : ", res.data);
  //     });
  // };

  const updatePo = ()=>{
    axios
      .post("http://entemadb.entema-software.com/updatePoData", {
        poid: id,
        podocno: podocno,
        podate: podate,
        porevno: porevno,
        ponumber: ponumber,
        poquotationref: poquotationref,
        poproject: poproject,
        popaymentmode: popaymentmode,
        povendor: povendor,
        pocode: pocode,
        pophone: pophone,
        pocpperson: pocpperson,
        pomobile: pomobile,
        poemail: poemail,
        povat: povat,
        poadd: poadd,
        postartdate: postartdate,
        poenddate: poenddate,
        polocation: polocation,
        pomobilizationdate: pomobilizationdate,
        podesc: podesc,
        pototal: pototal,
        pogst: pogst,
        pograndtotal: pograndtotal,
        instruction: instruction,
        deliveryTerms: deliveryTerms,
        conditionTerms: conditionTerms,
        taskList: orderItem,
      })
      .then((res) => {});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://entemadb.entema-software.com/removePOMulDataonId", {
        POID: id,
      })
      .then((res) => {
        //console.log("DELETED");
        updatePo();
      });    

    setId(0);
    setOpenPopup(false);
  };

  const onClosePopup = () => {
    setId(0);
    setOpenPopup(false);
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClosePopup()}
            style={{ flex: "end" }}
          >
            Close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "50px" }}
        >
          <div className="scroll">
            <form onChange={handleChangeEvent}>
              <div className="heading-layout1">
                <div className="item-title">
                  <h5 style={{ color: "blue" }}>New Purchase Orders</h5>
                </div>
              </div>

              <div class="col-md-4 mb-3">
                <label htmlFor="podocno">Doc No : </label>
                &nbsp;{podocno}
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="podate">Date : </label>
                &nbsp;{podate}
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="porevno">Rev. No : </label>
                &nbsp;{porevno}
              </div>

              <hr style={{ backgroundColor: "#030000" }} />
              <div className="heading-layout1">
                <div className="item-title">
                  <h5 style={{ color: "blue" }}>Work Order</h5>
                </div>
              </div>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label htmlFor="ponumber">Number</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="ponumber"
                    name="ponumber"
                    required
                    value={ponumber}
                    disabled
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label htmlFor="poquotationref">Quotation Ref</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="poquotationref"
                    name="poquotationref"
                    required
                    value={poquotationref}
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label htmlFor="poproject">Project</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="poproject"
                    name="poproject"
                    required
                    value={poproject}
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label htmlFor="popaymentmode">Mode / Terms Payment</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="popaymentmode"
                    name="popaymentmode"
                    required
                    value={popaymentmode}
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>
              <hr style={{ backgroundColor: "#030000" }} />
              <div className="heading-layout1">
                <div className="item-title">
                  <h5 style={{ color: "blue " }}>Vendor Info</h5>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label htmlFor="povendor">Vendor</label>
                <select
                  class="form-control is-valid"
                  id="povendor"
                  name="povendor"
                  required
                  value={povendor}
                  onChange={handleChangeEvent}
                  disabled
                >
                  <option key="" value="">
                    Select Vendor
                  </option>
                  {vendorLov.map((data) => (
                    <option key={data.VENDOR_ID} value={data.VENDOR_ID}>
                      {data.VENDOR_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div class="col-md-4 mb-3">
                  <label htmlFor="pocode">Code</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="pocode"
                    name="pocode"
                    disabled
                    value={pocode}
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label htmlFor="pophone">Phone Number</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="pophone"
                    name="pophone"
                    value={pophone}
                    onChange={handleChangeEvent}
                  />
                </div>

                <div class="col-md-4 mb-3">
                  <label htmlFor="pocpperson">Contact Person</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="pocpperson"
                    name="pocpperson"
                    value={pocpperson}
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>
              <div className="row">
                <div class="col-md-4 mb-3">
                  <label htmlFor="pomobile">Mobile</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="pomobile"
                    name="pomobile"
                    value={pomobile}
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label htmlFor="poemail">Email</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="poemail"
                    name="poemail"
                    value={poemail}
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label htmlFor="povat">Vat</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="povat"
                    name="povat"
                    value={povat}
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>
              <div class="col-md-8 mb-3">
                <label htmlFor="poadd">Address</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  id="poadd"
                  name="poadd"
                  value={poadd}
                  onChange={handleChangeEvent}
                />
              </div>
              <hr style={{ backgroundColor: "#030000" }} />
              <div className="heading-layout1">
                <div className="item-title">
                  <h5 style={{ color: "blue" }}>Work Schedule</h5>
                </div>
              </div>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label htmlFor="postartdate">Start Date</label>
                  <input
                    type="date"
                    class="form-control is-valid"
                    id="postartdate"
                    name="postartdate"                   
                    value={postartdate}
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label htmlFor="poenddate">End Date</label>
                  <input
                    type="date"
                    class="form-control is-valid"
                    id="poenddate"
                    name="poenddate"              
                    value={poenddate}
                    onChange={handleChangeEvent}
                  />
                </div>{" "}
              </div>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label htmlFor="polocation">Location</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="polocation"
                    name="polocation"
                    required
                    value={polocation}
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label htmlFor="pomobilizationdate">Mobilization Date</label>
                  <input
                    type="date"
                    class="form-control is-valid"
                    id="pomobilizationdate"
                    name="pomobilizationdate"                  
                    value={pomobilizationdate}
                    onChange={handleChangeEvent}
                  />{" "}
                </div>
              </div>

              <div class="col-md-10 mb-3">
                <label htmlFor="podesc">Description of work:</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  id="podesc"
                  name="podesc"                  
                  value={podesc}
                  onChange={handleChangeEvent}
                />
              </div>
              <hr style={{ backgroundColor: "#030000" }} />
              <div className="heading-layout1">
                <div className="item-title">
                  <h5 style={{ color: "blue" }}>Order Items</h5>
                </div>
              </div>

              {/* <Orderitem /> */}
              <table className="table" id="DataTables_Table_test" role="grid">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th style={{ paddingLeft: "30px" }}>Description</th>
                    <th style={{ paddingLeft: "56px" }}>Unit</th>
                    <th style={{ paddingLeft: "45px" }}>QTY</th>
                    <th style={{ paddingLeft: "30px" }}>Unit rate (Sar)</th>
                    <th style={{ paddingLeft: "30px" }}>Amount (sar)</th>
                  </tr>
                </thead>
              </table>
              <Container className={classes.root}>
                <Paper component={Box} p={4}>
                  {orderItem.map((item, index) => (
                    <Grid
                      container
                      spacing={3}
                      key={index}
                      className={classes.inputGroup}
                    >
                      <Grid item md={3}>
                        <TextField
                          label="Description"
                          name="description"
                          type="textarea"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, index)}
                          value={item.description}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={2}>
                        <FormControl
                          variant="outlined"
                          className={classes.inputGroup}
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Unit
                          </InputLabel>
                          <Select
                            native
                            value={item.unit}
                            onChange={(e) => handleChangeEvent(e, index)}
                            label="unit"
                            id="unit"
                            inputProps={{
                              name: "unit",
                              id: "outlined-age-native-simple",
                            }}
                          >
                            {optionUnit.map((data) => {
                              return (
                                <option key={data.key} value={data.value}>
                                  {data.key}
                                </option>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={2}>
                        <TextField
                          type="number"
                          label="qty"
                          name="qty"
                          // placeholder="Add Quantity"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, index)}
                          value={item.qty}
                          onBlur={(e) => handleBlur(e, index)}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item md={2}>
                        <TextField
                          type="number"
                          label="Unit Rate"
                          name="unit_rate"
                          // placeholder="Enter Your address"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, index)}
                          value={item.unit_rate}
                          onBlur={(e) => handleBlur(e, index)}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item md={2}>
                        <TextField
                          type="number"
                          label="Amount"
                          name="amount"
                          // placeholder="Enter Your address"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, index)}
                          value={item.amount}
                          disabled
                          fullWidth                          
                        />
                      </Grid>

                      <Grid item md={1}>
                        <IconButton color="secondary">
                          <DeleteOutlineIcon
                            onClick={() => removeItem(index)}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Paper>
              </Container>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={addItem}
                style={{ marginTop: "10px" }}
              >
                Add Order Item
              </Button>

              <hr style={{ backgroundColor: "green" }} />
              <div class="col-md-3 mb-3">
                <label htmlFor="userActdate">TOTAL</label>
                <br />
                {pototal}
              </div>
              <div class="col-md-3 mb-3">
                <label htmlFor="pogst">VAT</label>
                <input
                  type="number"
                  class="form-control is-valid"
                  id="pogst"
                  name="pogst"
                  value={pogst}
                  onChange={handleChangeEvent}
                  onBlur={(e) => {
                    onChangeGST(e.target.value);
                  }}
                  required
                />
              </div>
              <div class="col-md-3 mb-3">
                <label htmlFor="userActdate"> GRAND TOTAL</label>
                <br />
                {pograndtotal}
              </div>

              <hr style={{ backgroundColor: "#030000" }} />
              <div className="heading-layout1">
                <div className="item-title">
                  <h5 style={{ color: "blue" }}>INSTRUCTIONS</h5>
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label htmlFor="instruction">Instructions</label>
                <textarea
                  type="text"
                  className="form-control is-valid"
                  name="instruction"
                  onChange={handleChangeEvent}
                  id="instruction"
                  value={instruction}
                  rows="8"
                />
              </div>
              <div class="col-md-12 mb-3">
                <label htmlFor="deliveryTerms">Terms of delivery</label>
                <textarea
                  type="text"
                  className="form-control is-valid"
                  name="deliveryTerms"
                  onChange={handleChangeEvent}
                  id="deliveryTerms"
                  value={deliveryTerms}
                  rows="4"
                />
              </div>
              <div class="col-md-12 mb-3">
                <label htmlFor="conditionTerms">Terms & Conditions</label>
                <textarea
                  type="text"
                  className="form-control is-valid"
                  name="conditionTerms"
                  onChange={handleChangeEvent}
                  id="conditionTerms"
                  value={conditionTerms}
                  rows="8"
                />
              </div>
              <hr style={{ backgroundColor: "#030000" }} />
              <div className="heading-layout1">
                <div className="item-title">
                  <h5 style={{ color: "blue" }}>Accepted By</h5>
                </div>{" "}
              </div>

              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-6">
                    <h3>{sigName}</h3>
                    <div className="row">
                      <div className="col-sm-8 col-xs-8 bot-left">
                        Name &amp; Title
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-5 col-xs-6 bot-left">Date</div>
                      <div className="col-sm-7 col-xs-6 bot-right">
                        {" "}
                        {podate}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <h3>For Entema Al Shamal Gen. cont. Est</h3>
                    <h5>Authorised Signatory</h5>
                  </div>
                  <div className="col-sm-12 clearfix mt-3">
                    <button
                      type="buttom"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>{" "}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
