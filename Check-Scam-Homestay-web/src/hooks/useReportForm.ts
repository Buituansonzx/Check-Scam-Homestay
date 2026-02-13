import * as yup from 'yup';

export const reportValidationSchema = yup.object().shape({
  scammerName: yup.string().required('Vui lòng nhập tên người lừa đảo'),
  scammerPhoneNumber: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
  scammerBankName: yup.string().required('Vui lòng nhập tên ngân hàng'),
  scammerBankAccountNumber: yup.string().required('Vui lòng nhập số tài khoản ngân hàng'),
  scamAmount: yup.number().required('Vui lòng nhập số tiền bị lừa đảo').positive('Số tiền phải là số dương'),
  scamDescription: yup.string().required('Vui lòng mô tả chi tiết vụ việc'),
  scamDate: yup.date().required('Vui lòng chọn ngày xảy ra vụ việc'),
  scamEvidence: yup
    .mixed<FileList | File[]>()
    .test('required', 'Vui lòng cung cấp bằng chứng', (value) => {
      if (!value) return false;
      if (typeof FileList !== 'undefined' && value instanceof FileList) return value.length > 0;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof (value as { length?: unknown }).length === 'number') return (value as { length: number }).length > 0;
      return false;
    }),
});
