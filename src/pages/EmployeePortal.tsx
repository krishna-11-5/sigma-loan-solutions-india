
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, LogIn, UserPlus, Calculator, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const EmployeePortal = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('login');

  // Login/Signup state
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    bankName: '',
    bankBranch: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankContactNumber: '',
    bankEmail: '',
    username: '',
    password: ''
  });

  // Customer form state
  const [customerData, setCustomerData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    pincode: '',
    loanType: '',
    loanAmount: '',
    salary: '',
    salaryType: '',
    interestRate: '',
    loanTenure: ''
  });

  const [emiResult, setEmiResult] = useState(null);

  const loanTypes = ['Home Loan', 'Personal Loan', 'Car Loan', 'Business Loan', 'Loan Against Property', 'Others'];
  const salaryTypes = ['Cheque', 'Account', 'Cash'];

  const handleLogin = (e) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem('employeeData') || '[]');
    const employee = employees.find(e => e.username === loginData.username && e.password === loginData.password);
    
    if (employee) {
      setIsLoggedIn(true);
      setCurrentEmployee(employee);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${employee.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'contactNumber', 'email', 'bankName', 'accountNumber', 'username', 'password'];
    const missingFields = requiredFields.filter(field => !signupData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const employees = JSON.parse(localStorage.getItem('employeeData') || '[]');
    const existingEmployee = employees.find(e => e.username === signupData.username);
    
    if (existingEmployee) {
      toast({
        title: "Username Taken",
        description: "This username is already registered.",
        variant: "destructive",
      });
      return;
    }

    const newEmployee = {
      ...signupData,
      registrationDate: new Date().toISOString(),
      id: Date.now().toString()
    };

    employees.push(newEmployee);
    localStorage.setItem('employeeData', JSON.stringify(employees));

    toast({
      title: "Registration Successful",
      description: "Your employee account has been created successfully!",
    });

    setActiveTab('login');
    setSignupData({
      name: '',
      contactNumber: '',
      email: '',
      bankName: '',
      bankBranch: '',
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      bankContactNumber: '',
      bankEmail: '',
      username: '',
      password: ''
    });
  };

  const calculateEMI = () => {
    if (!customerData.loanAmount || !customerData.interestRate || !customerData.loanTenure) {
      toast({
        title: "Missing Information",
        description: "Please fill loan amount, interest rate, and tenure to calculate EMI.",
        variant: "destructive",
      });
      return;
    }

    const principal = parseFloat(customerData.loanAmount);
    const monthlyRate = parseFloat(customerData.interestRate) / 12 / 100;
    const months = parseInt(customerData.loanTenure) * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    setEmiResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    });
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'contactNumber', 'email', 'pincode', 'loanType', 'loanAmount', 'salary', 'salaryType'];
    const missingFields = requiredFields.filter(field => !customerData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const employeeCustomers = JSON.parse(localStorage.getItem('employeeCustomerData') || '[]');
    const customerRecord = {
      ...customerData,
      employeeId: currentEmployee.id,
      employeeName: currentEmployee.name,
      submissionDate: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    employeeCustomers.push(customerRecord);
    localStorage.setItem('employeeCustomerData', JSON.stringify(employeeCustomers));

    toast({
      title: "Customer Added Successfully",
      description: "Customer loan application has been recorded.",
    });

    setCustomerData({
      name: '',
      contactNumber: '',
      email: '',
      pincode: '',
      loanType: '',
      loanAmount: '',
      salary: '',
      salaryType: '',
      interestRate: '',
      loanTenure: ''
    });
    setEmiResult(null);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentEmployee(null);
    setLoginData({ username: '', password: '' });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Link to="/" className="flex items-center text-purple-600 hover:text-purple-800">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-6 w-6 mr-2 text-purple-600" />
                Welcome, {currentEmployee.name}
              </CardTitle>
              <CardDescription>Six Sigma Services Employee</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-purple-600" />
                Add New Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCustomerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input
                      id="customerName"
                      type="text"
                      placeholder="Enter customer's full name"
                      value={customerData.name}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerContact">Contact Number *</Label>
                    <Input
                      id="customerContact"
                      type="tel"
                      placeholder="Enter customer's mobile number"
                      value={customerData.contactNumber}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, contactNumber: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email ID *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="Enter customer's email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPincode">Pin Code *</Label>
                    <Input
                      id="customerPincode"
                      type="text"
                      placeholder="Enter customer's pin code"
                      value={customerData.pincode}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, pincode: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="customerLoanType">Type of Loan *</Label>
                      <Select value={customerData.loanType} onValueChange={(value) => setCustomerData(prev => ({ ...prev, loanType: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          {loanTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="customerLoanAmount">Required Loan Amount (₹) *</Label>
                      <Input
                        id="customerLoanAmount"
                        type="number"
                        placeholder="Enter loan amount"
                        value={customerData.loanAmount}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, loanAmount: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerSalary">Approximate Salary (₹) *</Label>
                      <Input
                        id="customerSalary"
                        type="number"
                        placeholder="Enter monthly salary"
                        value={customerData.salary}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, salary: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerSalaryType">Salary Type *</Label>
                      <Select value={customerData.salaryType} onValueChange={(value) => setCustomerData(prev => ({ ...prev, salaryType: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select salary type" />
                        </SelectTrigger>
                        <SelectContent>
                          {salaryTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    EMI Calculator
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="customerInterestRate">Interest Rate (% per annum)</Label>
                      <Input
                        id="customerInterestRate"
                        type="number"
                        step="0.1"
                        placeholder="Enter interest rate"
                        value={customerData.interestRate}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, interestRate: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerLoanTenure">Loan Tenure (Years)</Label>
                      <Input
                        id="customerLoanTenure"
                        type="number"
                        placeholder="Enter loan tenure in years"
                        value={customerData.loanTenure}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, loanTenure: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    onClick={calculateEMI}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    Calculate EMI
                  </Button>

                  {emiResult && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">EMI Calculation Result</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-blue-600">Monthly EMI</p>
                          <p className="text-xl font-bold text-blue-800">₹{emiResult.emi.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600">Total Amount</p>
                          <p className="text-xl font-bold text-blue-800">₹{emiResult.totalAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600">Total Interest</p>
                          <p className="text-xl font-bold text-blue-800">₹{emiResult.totalInterest.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3">
                  Add Customer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center text-purple-600 hover:text-purple-800">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Employee Portal</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-6 w-6 mr-2 text-purple-600" />
              Employee Access
            </CardTitle>
            <CardDescription>
              Login to your existing account or register as a new employee
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="loginUsername">Username</Label>
                    <Input
                      id="loginUsername"
                      type="text"
                      placeholder="Enter your username"
                      value={loginData.username}
                      onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Login
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employeeName">Name *</Label>
                      <Input
                        id="employeeName"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeeContact">Contact Number *</Label>
                      <Input
                        id="employeeContact"
                        type="tel"
                        placeholder="Enter mobile number"
                        value={signupData.contactNumber}
                        onChange={(e) => setSignupData(prev => ({ ...prev, contactNumber: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="employeeEmail">Email ID *</Label>
                    <Input
                      id="employeeEmail"
                      type="email"
                      placeholder="Enter email address"
                      value={signupData.email}
                      onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bankName">Bank Name *</Label>
                        <Input
                          id="bankName"
                          type="text"
                          placeholder="Enter bank name"
                          value={signupData.bankName}
                          onChange={(e) => setSignupData(prev => ({ ...prev, bankName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bankBranch">Bank Branch</Label>
                        <Input
                          id="bankBranch"
                          type="text"
                          placeholder="Enter branch name"
                          value={signupData.bankBranch}
                          onChange={(e) => setSignupData(prev => ({ ...prev, bankBranch: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountHolderName">Account Holder Name</Label>
                        <Input
                          id="accountHolderName"
                          type="text"
                          placeholder="Enter account holder name"
                          value={signupData.accountHolderName}
                          onChange={(e) => setSignupData(prev => ({ ...prev, accountHolderName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountNumber">Account Number *</Label>
                        <Input
                          id="accountNumber"
                          type="text"
                          placeholder="Enter account number"
                          value={signupData.accountNumber}
                          onChange={(e) => setSignupData(prev => ({ ...prev, accountNumber: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          type="text"
                          placeholder="Enter IFSC code"
                          value={signupData.ifscCode}
                          onChange={(e) => setSignupData(prev => ({ ...prev, ifscCode: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bankContactNumber">Bank Contact Number</Label>
                        <Input
                          id="bankContactNumber"
                          type="tel"
                          placeholder="Enter bank contact"
                          value={signupData.bankContactNumber}
                          onChange={(e) => setSignupData(prev => ({ ...prev, bankContactNumber: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="bankEmail">Bank Email ID</Label>
                      <Input
                        id="bankEmail"
                        type="email"
                        placeholder="Enter bank email"
                        value={signupData.bankEmail}
                        onChange={(e) => setSignupData(prev => ({ ...prev, bankEmail: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">Login Credentials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="signupUsername">Username *</Label>
                        <Input
                          id="signupUsername"
                          type="text"
                          placeholder="Choose a username"
                          value={signupData.username}
                          onChange={(e) => setSignupData(prev => ({ ...prev, username: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="signupPassword">Password *</Label>
                        <Input
                          id="signupPassword"
                          type="password"
                          placeholder="Choose a password"
                          value={signupData.password}
                          onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Register as Employee
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeePortal;
