import React, { useState, useRef } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PromModal from './PromModal';

export default function PromForm({ chosen }) {
  const employeeNumber = chosen.employeeNumber;
  const [openPos, setOpenPos] = useState(false);
  const [openWage, setOpenWage] = useState(false);
  const [openHours, setOpenHours] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [submittedValues, setSubmittedValues] = useState({});
  const formikRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (values) => {
    setSubmittedValues(values);
    setOpenModal(true);
  }

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <div>
      <Formik initialValues={{ newPos: '', newWage: '', newHours: '' }} onSubmit={submitHandler} innerRef={formikRef}>
        {({ setFieldValue }) => (
          <Form>
            <label>New position:</label>
            {openPos ? (
              <div>
                <Field type='text' name='newPos' />
                <ErrorMessage name='newPos' component='div' />

                <button type='button' onClick={() => {
                    setOpenPos(false);
                    setFieldValue('newPos', '');
                  }}>Cancel</button>
              </div>
            ) : (
              <button type='button' onClick={() => setOpenPos(true)}>Add New</button>
            )}

            <label>New wage:</label>
            {openWage ? (
              <div>
                <Field type='text' name='newWage' />
                <ErrorMessage name='newWage' component='div' />

                <button type='button' onClick={() => {
                    setOpenWage(false);
                    setFieldValue('newWage', '');
                  }}>Cancel</button>
              </div>
            ) : (
              <button type='button' onClick={() => setOpenWage(true)}>Add New</button>
            )}

            <div>
              <label>Hours:</label>
              {openHours ? (
                <div>
                  <Field type="radio" name="newHours" value="pt" />
                  <span>PT</span>

                  <Field type="radio" name="newHours" value="ft" />
                  <span>FT</span>

                  <ErrorMessage name='newHours' component='div' />

                  <button type='button' onClick={() => {
                    setOpenHours(false);
                    setFieldValue('newHours', '');
                  }}>Cancel</button>
                </div>
              ) : (
                <button type='button' onClick={() => setOpenHours(true)}>Change</button>
              )}
            </div>

            <button type='submit'>
              Next
            </button>
            <button type='button' onClick={cancelHandler}>
              Cancel
            </button>

          </Form>
        )}
      </Formik>
      {openModal && (
        <PromModal
          values={submittedValues}
          setOpenModal={setOpenModal}
          employeeNumber={employeeNumber}
          formikRef={formikRef}
        />
      )}
    </div>
  );
}
