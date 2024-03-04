import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import HireModal from './HireModal';

const CustomField = ({ name, ...props }) => {
  const { errors, touched } = useFormikContext();
  const hasError = errors[name] && touched[name];
  const noError = !errors[name] && touched[name];

  const errorColor = () => {
    if (hasError) {
      return 'hasError'
    } else if (noError) {
      return 'noError'
    } else {
      return ''
    }
  }

  return (
    <>
      <Field
        name={name}
        {...props}
        className={errorColor()}
      />
    </>
  )
}

const CustomDate = ({ name, ...props }) => {
  const { setFieldValue, errors, touched } = useFormikContext();
  const hasError = errors[name] && touched[name];
  const noError = !errors[name] && touched[name];

  const changeHandler = (event) => {
    const inputDate = event.target.value // Remove non-numeric characters and limit length to 6 digits
    const formatted = inputDate.replace(/[^0-9]/g, "") // Allow only numbers
    .substring(0, 7) // Limit to max 7 characters
    .replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");
    setFieldValue(name, formatted)
  }

  const errorColor = () => {
    if (hasError) {
      return 'hasError'
    } else if (noError) {
      return 'noError'
    } else {
      return ''
    }
  }

  return (
    <>
      <Field
        name={name}
        {...props}
        className={errorColor()}
        onChange={changeHandler}
      />
    </>
  )
}

const CustomPhone = ({ name, ...props }) => {
  const { setFieldValue, errors, touched } = useFormikContext();
  const hasError = errors[name] && touched[name];
  const noError = !errors[name] && touched[name];

  const changeHandler = (event) => {
    const inputPhone = event.target.value;
    const formatted = inputPhone.replace(/[^0-9]/g, "")
    .substring(0, 10)
    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    setFieldValue(name, formatted)
  }

  const errorColor = () => {
    if (hasError) {
      return 'hasError'
    } else if (noError) {
      return 'noError'
    } else {
      return ''
    }
  }

  return (
    <>
      <Field
        name={name}
        {...props}
        className={errorColor()}
        onChange={changeHandler}
      />
    </>
  )
}

export default function HireForm() {
  const [openModal, setOpenModal] = useState(false);
  const [submittedValues, setSubmittedValues] = useState({});
  const formikRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const focusHandler = (event) => {
    setIsFocused(true);
    console.log(isFocused);
    const label = event.target.parentElement.querySelector('label');
    const input = event.target.parentElement.querySelector('input')
    label.classList.add('focused');
    input.classList.add('placeholder')
  };

  const initialValues = {
    doh: '',
    employeeNumber: '',
    firstName: '',
    middleInit: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    position: '',
    wage: '',
    hours: '',
    status: 'Active',
    strikes: 0,
    corr: [],
  }

  const validationSchema = Yup.object().shape({
    doh: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{2}$/, '6 digits, 2 slashes')
      .required('*'),
    employeeNumber: Yup.string()
      .required('*'),
    firstName: Yup.string()
      .required('*'),
    middleInit: Yup.string()
      .required('*'),
    lastName: Yup.string()
      .required('*'),
    address: Yup.string()
      .required('*'),
    city: Yup.string()
      .required('*'),
    state: Yup.string()
      .required('*'),
    zip: Yup.string()
      .matches(/^\d{5}$/, '5 digits')
      .required('*'),
    phone: Yup.string()
      .matches(/^\(\d{3}\) \d{3}-\d{4}$/, '10 digits, 2 parentheses, 1 dash')
      .required('*'),
    email: Yup.string()
      .email('Invalid format')
      .required('*'),
    position: Yup.string()
      .required('*'),
    wage: Yup.string()
      .matches(/^[^\$]*$/, "No $ sign")
      .required('*'),
    hours: Yup.string()
      .required('*'),
  })

  const SubmitButton = () => {
    const { isValid, dirty } = useFormikContext();
    return <button type="submit" disabled={!(isValid && dirty)} tabIndex="19">Next</button>;
  }

  const removeFocus = () => {
    const labels = document.querySelectorAll('label');
    labels.forEach(label => label.classList.remove('focused'));
  }

  const submitHandler = (values) => {
    setSubmittedValues(values);
    setOpenModal(true);
  }

  const cancelHandler = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
      removeFocus();
    }
  }


  return (
   <div>
    <Formik initialValues={initialValues} onSubmit={submitHandler} innerRef={formikRef} validationSchema={validationSchema}>
      <Form>
        <h1>New Employee</h1>
        <div className='multiWrapper'>
          <div id='doh' className='fieldWrapper'>
            <label htmlFor='dohField'>Date of Hire</label>
            <CustomDate onFocus={focusHandler} id='dohField' type='text' name='doh' tabIndex='1' placeholder='MMDDYY' />
          </div>

          <div id='employeeNumber' className='fieldWrapper'>
            <label htmlFor='employeeNumberField'>Assign Employee Number</label>
            <CustomField onFocus={focusHandler} id='employeeNumberField' type='text' name='employeeNumber' tabIndex='2' placeholder='1234' />
          </div>
        </div>

        <div className='multiWrapper'>
          <div id='firstName' className='fieldWrapper'>
            <label htmlFor='firstNameField'>First Name</label>
            <CustomField onFocus={focusHandler} id='firstNameField' type='text' name='firstName' tabIndex='3' placeholder='John' />
          </div>

          <div id='middleInit' className='fieldWrapper'>
            <label htmlFor='middleInitField'>MI</label>
            <CustomField onFocus={focusHandler} id='middleInitField' type='text' name='middleInit' tabIndex='4' placeholder='A' />
          </div>

          <div id='lastName' className='fieldWrapper'>
            <label htmlFor='lastNameField'>Last Name</label>
            <CustomField onFocus={focusHandler} id='lastNameField' type='text' name='lastName' tabIndex='5' placeholder='Jones' />
          </div>
        </div>

        <div className='multiWrapper'>
          <div id='address' className='fieldWrapper'>
            <label htmlFor='addressField'>Address</label>
            <CustomField onFocus={focusHandler} id='addressField' type='text' name='address' tabIndex='6' placeholder='123 S Main St' />
          </div>
        </div>

        <div className='multiWrapper'>
          <div id='city' className='fieldWrapper'>
            <label htmlFor='cityField'>City</label>
            <CustomField id='cityField' onFocus={focusHandler} type='text' name='city' tabIndex='7' placeholder='Anytown' />
          </div>
          <div id='state' className='fieldWrapper'>
            <CustomField as='select' name='state' tabIndex='8' >
              <option value='' label='State' id='default'/>
              <option value='AL' label='AL' />
              <option value='AK' label='AK' />
              <option value='AZ' label='AZ' />
              <option value='AR' label='AR' />
              <option value='CA' label='CA' />
              <option value='CO' label='CO' />
              <option value='CT' label='CT' />
              <option value='DE' label='DE' />
              <option value='FL' label='FL' />
              <option value='GA' label='GA' />
              <option value='HI' label='HI' />
              <option value='ID' label='ID' />
              <option value='IL' label='IL' />
              <option value='IN' label='IN' />
              <option value='IA' label='IA' />
              <option value='KS' label='KS' />
              <option value='KY' label='KY' />
              <option value='LA' label='LA' />
              <option value='ME' label='ME' />
              <option value='MD' label='MD' />
              <option value='MA' label='MA' />
              <option value='MI' label='MI' />
              <option value='MN' label='MN' />
              <option value='MS' label='MS' />
              <option value='MO' label='MO' />
              <option value='MT' label='MT' />
              <option value='NE' label='NE' />
              <option value='NV' label='NV' />
              <option value='NH' label='NH' />
              <option value='NJ' label='NJ' />
              <option value='NM' label='NM' />
              <option value='NY' label='NY' />
              <option value='NC' label='NC' />
              <option value='ND' label='ND' />
              <option value='OH' label='OH' />
              <option value='OK' label='OK' />
              <option value='OR' label='OR' />
              <option value='PA' label='PA' />
              <option value='RI' label='RI' />
              <option value='SC' label='SC' />
              <option value='SD' label='SD' />
              <option value='TN' label='TN' />
              <option value='TX' label='TX' />
              <option value='UT' label='UT' />
              <option value='VT' label='VT' />
              <option value='VA' label='VA' />
              <option value='WA' label='WA' />
              <option value='WV' label='WV' />
              <option value='WI' label='WI' />
              <option value='WY' label='WY' />
            </CustomField>
          </div>

          <div id='zip' className='fieldWrapper'>
            <label htmlFor='zipField'>ZIP</label>
            <CustomField onFocus={focusHandler} id='zipField' type='text' name='zip' tabIndex='9' placeholder='12345'  />
          </div>
        </div>

        <div id='phoneMultiWrapper' className='multiWrapper'>
          <div id='phone' className='fieldWrapper'>
            <label htmlFor='phoneField'>Phone Number</label>
            <CustomPhone onFocus={focusHandler} id='phoneField' type='text' name='phone' tabIndex='10' placeholder='1234567891' />
          </div>
        </div>

        <div className='multiWrapper'>
          <div id='email' className='fieldWrapper'>
            <label htmlFor='emailField'>Email</label>
            <CustomField onFocus={focusHandler} id='emailField' type='email' name='email' tabIndex='11' placeholder='john@example.com' />
          </div>
        </div>

        <div className='multiWrapper'>
          <div id='position' className='fieldWrapper'>
            <CustomField as='select' name='position' tabIndex='12'>
              <option value='' label='Position' />
              <option value='Associate' label='Associate' />
              <option value='Team Lead' label='Team Lead' />
              <option value='Senior Team Lead' label='Senior Team Lead' />
              <option value='Assistant Manager' label='Assistant Manager' />
              <option value='Store Manager' label='Store Manager' />
            </CustomField>
          </div>

          <div className='fieldWrapper' id='wage'>
            <label htmlFor='wageField'>Hourly Wage</label>
            <CustomField onFocus={focusHandler} id='wageField' type='text' name='wage' tabIndex='13' placeholder='00.00' />
          </div>


          <div id='hours' className='fieldWrapper'>
            <div id='radio1' className='radio'>
              <CustomField type="radio" name="hours" value="pt" tabIndex='14' />
              <span>Part-Time</span>
            </div>
            <div className='radio'>
              <CustomField type="radio" name="hours" value="ft" tabIndex='15' />
              <span>Full-Time</span>
            </div>
          </div>
        </div>

        <div className='buttonContainer'>
          <SubmitButton tabIndex='16' />
          <button type='button' onClick={cancelHandler}>Reset Form</button>
        </div>

      </Form>

    </Formik>
    <div>
      {openModal && (
        <HireModal removeFocus={removeFocus} values={submittedValues} setOpenModal={setOpenModal} formikRef={formikRef} />
      )}
    </div>
   </div>
  )
}