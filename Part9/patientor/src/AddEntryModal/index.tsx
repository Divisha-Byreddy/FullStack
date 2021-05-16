import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { NewEntry } from '../types';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import { AddHospitalEntry } from './AddHospitalEntryForm';
import AddOccupationalHCForm from './AddOccupationalHCForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

export const AddOccupationalHCEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add New OccasionalHC Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHCForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error} : Props) => (
  <Modal open = {modalOpen} onClose = {onClose} centered = {false} closeIcon>
    <Modal.Header> Add New Hospital Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color = "red">{`Error : ${error}`}</Segment>}
      <AddHospitalEntry onSubmit = {onSubmit} onCancel = {onClose}/>
    </Modal.Content>
  </Modal>
);

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add New HealthCare Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
