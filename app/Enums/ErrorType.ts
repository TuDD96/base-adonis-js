const enum ErrorType {
  CODE_4000 = '4000',
  STATUS_4000 = 400,

  // Authentication failed
  CODE_4010 = '4010',
  STATUS_4010 = 401,

  // Token has expired
  CODE_4011 = '4011',
  STATUS_4011 = 401,

  // email invite has expired
  CODE_4014 = '4014',
  STATUS_4014 = 401,

  // Token is invalid
  CODE_4012 = '4012',
  STATUS_4012 = 401,

  // Token is already used
  CODE_4013 = '4013',
  STATUS_4013 = 401,

  // password is incorrect
  CODE_4015 = '4015',
  STATUS_4015 = 401,

  // Not authorized
  CODE_4030 = '4030',
  STATUS_4030 = 403,

  // Access denied
  CODE_4031 = '4031',
  STATUS_4031 = 403,

  // Blocked
  CODE_4032 = '4032',
  STATUS_4032 = 403,

  // Data duplicate on unique column
  CODE_4033 = '4033',
  STATUS_4033 = 403,

  // No account
  CODE_4040 = '4040',
  STATUS_4040 = 404,

  // No data
  CODE_4041 = '4041',
  STATUS_4041 = 404,

  // Not logged in
  CODE_4042 = '4042',
  STATUS_4042 = 404,

  // Invalid HTTP method
  CODE_4050 = '4050',
  STATUS_4050 = 405,

  // This process has been already executed
  CODE_4090 = '4090',
  STATUS_4090 = 409,

  //The account cannot be registered
  CODE_4091 = '4091',
  STATUS_4091 = 409,

  // Validation error
  CODE_4220 = '4220',
  STATUS_4220 = 422,

  // Another user is operating
  CODE_4230 = '4230',
  STATUS_4230 = 423,

  // System error
  CODE_5000 = '5000',
  STATUS_5000 = 500,

  // Unexpected error
  CODE_5001 = '5001',
  STATUS_5001 = 500,

  // DB error
  CODE_5002 = '5002',
  STATUS_5002 = 500,

  // Registration failed
  CODE_5003 = '5003',
  STATUS_5003 = 500,

  // Update failed
  CODE_5004 = '5004',
  STATUS_5004 = 500,

  // Deletion failed
  CODE_5005 = '5005',
  STATUS_5005 = 500,

  // Settlement failed
  CODE_5006 = '5006',
  STATUS_5006 = 500,

  // Data has been changed by another user
  CODE_5007 = '5007',
  STATUS_5007 = 500,

  // Reset password
  CODE_5008 = '5008',
  STATUS_5008 = 500,

  // BusinessCard cannot be deleted
  CODE_5009 = '5009',
  STATUS_5009 = 500,
}

export default ErrorType
