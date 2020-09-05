import React, { useEffect, useState } from "react";
import { useStateValue, addPatientAction, addNewEntryAction } from "../state";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient, Entry, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";
import EntryComponent from "./Entry";
import { Icon, Button } from "semantic-ui-react";
import AddEntryModal from "./AddEntryModal";
// import AddEntryForm from "./AddEntryForm";

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p?.id === id);
  const [error, setError] = useState<string | undefined>();
  const [modal, setModal] = useState<boolean>(false);

  const closeModal = (): void => setModal(false);

  const openMoldal = (): void => {
    setError(undefined);
    setModal(true);
  };

  const onSubmit = async (entry: NewEntry) => {
    try {
      const { data } = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      dispatch(addNewEntryAction({ entry: data, id }));
      closeModal();
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
    }
  };

  const onCancel = (): void => {
    closeModal();
  };
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

      dispatch(addPatientAction(data));
    }

    if (!patient) {
      fetchData();
    }
  }, [id, dispatch, patient]);

  return (
    <div className="patient-page">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 20 }}>{patient?.name}</h1>
        {patient?.gender === "male" ? (
          <Icon name="male" size="big" />
        ) : (
          <Icon name="female" size="big" />
        )}
      </div>
      <h4>ssn: {patient?.ssn}</h4>
      <h4>occupation: {patient?.occupation}</h4>
      <h3>entries</h3>
      <div>
        {patient?.entries.map((entry: Entry) => (
          <EntryComponent key={entry.id} entry={entry} />
        ))}
      </div>
      <AddEntryModal
        onClose={onCancel}
        onSubmit={onSubmit}
        error={error}
        modalOpen={modal}
      />
      <Button onClick={() => openMoldal()}>Add Entry</Button>
    </div>
  );
};

export default PatientPage;
