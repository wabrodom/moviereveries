import { useField } from 'formik'

const FormikInput = ({ name, ...props }) => {
  const [field, meta] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <div>
      <input
        {...field}
        {...props}
      />
      {showError && <span>{meta.error}</span>}
    </div>
  )
}

export default FormikInput

// // field object already has the necessary [onChange, onBlur, value] props.
// import { useField } from 'formik'

// const FormikInput = ({ name, ...props }) => {
//   const [field, meta, helpers] = useField(name)
//   const showError = meta.touched && meta.error

//   return (
//     <div>
//       <input
//         onChange={value => helpers.setValue(value)}
//         onBlur={() => helpers.setTouched(true)}
//         value={field.value}
//         {...props}
//       />
//       {showError
//         && <span> {meta.error} </span>
//       }
//     </div>
//   );
// };

// export default FormikInput