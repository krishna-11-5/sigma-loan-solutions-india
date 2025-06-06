
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calculator, Users, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const loanTypes = [
    { name: 'Home Loan', description: 'Fulfill your dream of owning a home', icon: '🏠' },
    { name: 'Personal Loan', description: 'For all your personal financial needs', icon: '💰' },
    { name: 'Car Loan', description: 'Drive your dream car today', icon: '🚗' },
    { name: 'Business Loan', description: 'Grow your business with our support', icon: '🏢' },
    { name: 'Loan Against Property', description: 'Unlock the value of your property', icon: '🏘️' },
    { name: 'Others', description: 'Customized loan solutions for you', icon: '📋' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Six Sigma Services</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">+91-7397834578</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Trusted <span className="text-blue-600">Loan Partner</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Six Sigma Services provides comprehensive loan solutions across all sectors. 
            Quick approval, competitive rates, and excellent customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/customer-portal">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Apply for Loan
              </Button>
            </Link>
            <Link to="/partner-portal">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Partner Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Loan Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanTypes.map((loan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{loan.icon}</div>
                  <CardTitle className="text-xl">{loan.name}</CardTitle>
                  <CardDescription>{loan.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Access Our Portals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-center">Customer Portal</CardTitle>
                <CardDescription className="text-center">
                  Apply for loans and calculate EMI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/customer-portal" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Access Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-center">Partner Portal</CardTitle>
                <CardDescription className="text-center">
                  For our trusted agents and partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/partner-portal" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Access Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Building2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-center">Employee Portal</CardTitle>
                <CardDescription className="text-center">
                  For Six Sigma Services employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/employee-portal" className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Access Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Six Sigma Services?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Quick Approval</h4>
              <p className="text-gray-600">Fast loan processing and approval</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Secure Process</h4>
              <p className="text-gray-600">100% secure and confidential</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Expert Support</h4>
              <p className="text-gray-600">Dedicated customer support team</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Competitive Rates</h4>
              <p className="text-gray-600">Best interest rates in the market</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Building2 className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold">Six Sigma Services</h3>
              </div>
              <p className="text-gray-400">
                Your trusted partner for all loan requirements across India.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91-XXXXXXXXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>sixsigmaservices01@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Nagpur, Maharashtra, India</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/customer-portal" className="block text-gray-400 hover:text-white">
                  Customer Portal
                </Link>
                <Link to="/partner-portal" className="block text-gray-400 hover:text-white">
                  Partner Portal
                </Link>
                <Link to="/employee-portal" className="block text-gray-400 hover:text-white">
                  Employee Portal
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Six Sigma Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
