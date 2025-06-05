
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator, User, Phone, Mail, MapPin, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const CustomerPortal = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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

  const loanTypes = [
    'Home Loan',
    'Personal Loan',
    'Car Loan',
    'Business Loan',
    'Loan Against Property',
    'Others'
  ];

  const salaryTypes = ['Cheque', 'Account', 'Cash'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEMI = () => {
    if (!formData.loanAmount || !formData.interestRate || !formData.loanTenure) {
      toast({
        title: "Missing Information",
        description: "Please fill loan amount, interest rate, and tenure to calculate EMI.",
        variant: "destructive",
      });
      return;
    }

    const principal = parseFloat(formData.loanAmount);
    const monthlyRate = parseFloat(formData.interestRate) / 12 / 100;
    const months = parseInt(formData.loanTenure) * 12;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'contactNumber', 'email', 'pincode', 'loanType', 'loanAmount', 'salary', 'salaryType'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Store in localStorage (simulating Excel sheet)
    const existingCustomers = JSON.parse(localStorage.getItem('customerData') || '[]');
    const customerRecord = {
      ...formData,
      submissionDate: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    existingCustomers.push(customerRecord);
    localStorage.setItem('customerData', JSON.stringify(existingCustomers));

    toast({
      title: "Application Submitted!",
      description: "Your loan application has been submitted successfully. We will contact you soon.",
    });

    // Reset form
    setFormData({
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Customer Portal</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-6 w-6 mr-2 text-blue-600" />
              Loan Application Form
            </CardTitle>
            <CardDescription>
              Fill out the form below to apply for your loan. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email ID *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pin Code *</Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="Enter your area pin code"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Loan Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="loanType">Type of Loan *</Label>
                    <Select value={formData.loanType} onValueChange={(value) => handleInputChange('loanType', value)}>
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
                    <Label htmlFor="loanAmount">Required Loan Amount (₹) *</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="Enter loan amount"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salary">Approximate Salary (₹) *</Label>
                    <Input
                      id="salary"
                      type="number"
                      placeholder="Enter your monthly salary"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryType">Salary Type *</Label>
                    <Select value={formData.salaryType} onValueChange={(value) => handleInputChange('salaryType', value)}>
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

              {/* EMI Calculator */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  EMI Calculator
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      placeholder="Enter interest rate"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      placeholder="Enter loan tenure in years"
                      value={formData.loanTenure}
                      onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button 
                  type="button" 
                  onClick={calculateEMI}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  Calculate EMI
                </Button>

                {emiResult && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">EMI Calculation Result</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-green-600">Monthly EMI</p>
                        <p className="text-xl font-bold text-green-800">₹{emiResult.emi.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-600">Total Amount</p>
                        <p className="text-xl font-bold text-green-800">₹{emiResult.totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-600">Total Interest</p>
                        <p className="text-xl font-bold text-green-800">₹{emiResult.totalInterest.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                Submit Loan Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortal;
