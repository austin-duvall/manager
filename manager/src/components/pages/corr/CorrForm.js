import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import CorrModal from './CorrModal';

export default function CorrForm({ setAddCorr, chosen, updateChosenWithNewCorr }) {
  const employeeNumber = chosen.employeeNumber;
  const [openModal, setOpenModal] = useState(false);
  const [corrValues, setCorrValues] = useState(null);
  const formikRef = useRef();

  const initialValues = {
    dateOfOffense: '',
    offenseDescription: '',
    strike: 0,
  };

  const submitHandler = (values) => {
    setCorrValues(values)
    setOpenModal(true)
  }

  const backHandler = () => {
    setAddCorr(false);
  }

  const validationSchema = Yup.object().shape({
    dateOfOffense: Yup.date()
      .required('Required'),
    offenseDescription: Yup.string()
      .required('Required'),
  })

  const SubmitButton = () => {
    const { isValid, dirty } = useFormikContext();
    return <button type='submit' disabled={!(isValid && dirty)}>Next</button>;
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={submitHandler} innerRef={formikRef} validationSchema={validationSchema}>
        <Form>
          <label>Date of Offense:</label>
          <Field type='date' name='dateOfOffense' />
          <ErrorMessage name='dateOfOffense' component='div' />

          <label>Offense:</label>
          <Field as='textarea' name='offenseDescription' />
          <ErrorMessage name='offenseDescription' component='div' />

          <label>Strike:</label>
          <Field type='checkbox' name='strike' />
          <ErrorMessage name='strike' component='div' />

          <SubmitButton />
          <button type='button' onClick={backHandler}>Back</button>
        </Form>
      </Formik>
      {openModal && (
        <CorrModal corrValues={corrValues} employeeNumber={employeeNumber} formikRef={formikRef} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
