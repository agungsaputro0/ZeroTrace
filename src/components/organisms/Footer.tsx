import React from 'react';
import Logo from '../atoms/Logo';
import SocialIcon from '../atoms/SocialIcon';
import FooterInfo from '../molecules/FootersInfo';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
<footer className="mt-auto footer bg-footerblue text-white">
  <div className="bg-footeruplist py-2">
    <ul className="flex justify-center space-x-6 text-sm text-white mr-[10px] ml-[10px]">
    {/* <ul className="flex justify-center space-x-6 text-sm text-white sm:space-x-4 sm:flex-col xs:items-center"> */}
      <li><a href="#" className="hover:text-cyan-300">Peta Situs</a></li>
      <li><a href="#" className="hover:text-cyan-300">Hubungi Kami</a></li>
      <li><a href="#" className="hover:text-cyan-300">Kebijakan Privasi</a></li>
      <li><a href="#" className="hover:text-cyan-300">Syarat dan Ketentuan</a></li>
    </ul>
  </div>

  <div className="container mt-2 mx-auto py-4 flex flex-col lg:flex-row lg:justify-between md:flex-row md:justify-between">
    <div className="footer-left mb-8 lg:text-left md:text-left ml-5 sm:ml-5 mt-[2px]">
      <Logo />
      <FooterInfo />
    </div>
    <div className="footer-right sm:footer-left mb-8 mt-4 lg:mt-0 ml-7 text-left lg:text-left md:text-left mt-[2px]">
      <h4 className="text-amber-400"><b>Kontak Kami</b></h4>
      <p className="mt-1"><MailOutlined /> <b>Email</b></p>
      <p><MailOutlined className="text-transparent md:hidden sm:contents lg:contents" /> tim.apastyle@gmail.com</p>
      <p className="mt-1"><PhoneOutlined /> <b>Phone</b></p>
      <p><PhoneOutlined className="text-transparent" /> 081294599862</p>
    </div>
    <div className="footer-right mb-8 mt-4 lg:mt-0 md:mr-10 sm:mr-5 ml-7 mt-[2px]">
      <h4 className="mb-2 text-amber-400"><b>Ikuti Kami</b></h4>
      <SocialIcon />
    </div>
  </div>
</footer>

  );
};

export default Footer;
