import React, { ReactNode } from "react";
import {
  Shield,
  CheckCircle,
  Clock,
  X,
  RefreshCw,
  ShoppingCart,
  Target,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type PolicySectionProps = {
  icon: LucideIcon; // Type for the Lucide icons
  title: string;
  children: ReactNode;
  image?: string; // Make the image prop optional
};

const PolicySection: React.FC<PolicySectionProps> = ({
  icon: Icon,
  title,
  children,
  image,
}) => (
  <Card className="mb-6 flex justify-between items-center">
    <div>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="w-8 h-8 text-emerald-500">
          <Icon size={24} />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">{children}</div>
        <button className="mt-4 text-emerald-500 hover:text-emerald-600 font-medium">
          See More
        </button>
      </CardContent>
    </div>
    {image && ( // Conditionally render the Image component
      <div>
        <Image src={image} width={900} height={800} alt={title} />
      </div>
    )}
  </Card>
);

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <PolicySection
        image="/pp-1.png"
        icon={Shield}
        title="Robust Security Measures"
      >
        We prioritize the protection of your facts with enterprise-main security
        features. These include encryption protocols, stable servers, firewalls,
        and regular vulnerability assessments. Our team continuously video
        displays units and updates our structures to stay in advance of
        potential threats, ensuring your information remains secure.
      </PolicySection>

      <PolicySection
        image="/pp-2.png"
        icon={CheckCircle}
        title="Handling Payment Information Securely"
      >
        All charge transactions on our platform are processed through stable and
        trusted charge gateways. Your financial information is encrypted all
        through transmission, adhering to PCI-DSS compliance standards. We no
        longer shop touchy price data on our servers until required for precise
        ordinary transactions, and best together with your specific consent.
      </PolicySection>

      <PolicySection
        image="/pp-3.png"
        icon={RefreshCw}
        title="Changes and Updates to This Privacy Policy"
      >
        This Privacy Policy can be updated periodically to reflect new
        practices, services, or prison necessities. All updates can be published
        on this web page with a revised "ultimate up to date" date. Continued
        use of our platform after modifications signifies your popularity of the
        updated policy.
      </PolicySection>

      <PolicySection
        image="/pp-4.png"
        icon={Clock}
        title="Use of Cookies and Tracking Technologies"
      >
        We use cookies and comparable technologies to enhance your browsing
        experience, understand consumer behaviour, and offer customized hints.
        Cookies assist us don't forget your possibilities and optimize internet
        site performance. You can control or disable cookies via your browser
        settings, however doing so may also restriction some functionality.
      </PolicySection>

      <PolicySection icon={X} title="Requesting Data Deletion">
        You have the right to request the deletion of your records at any time.
        Please submit your request by contacting us at privacy@zyckproperty.Com.
        Please note that we may keep positive statistics to fulfill criminal
        duties or clear up disputes, as required by law.
      </PolicySection>

      <PolicySection
        icon={ShoppingCart}
        title="Information Disclosure Practices"
      >
        <p>We might also disclose your statistics to:</p>
        <ul className="list-disc pl-5">
          <li>Comply with criminal requirements or regulatory authorities.</li>
          <li>Protect our rights, assets, or the protection of our users.</li>
          <li>
            Prevent fraud, cope with security issues, or implement our Terms of
            Use.
          </li>
        </ul>
        <p>
          Any disclosures could be carried out in keeping with relevant felony
          frameworks to ensure transparency and integrity.
        </p>
      </PolicySection>

      <PolicySection
        icon={Target}
        title="Sharing Your Personal Information with Trusted Entities"
      >
        We only percentage your facts with cautiously selected 1/3 events, along with:
        <ul className="list-disc pl-5">
          <li><strong>Service Providers:</strong> For fee processing, web hosting, and analytics.</li>
          <li><strong>Business Partners:</strong> With your consent, for joint promotional activities.</li>
          <li>
          <strong>Legal Authorities:</strong> When mandated by using regulation or to guard our rights and customers.
          </li>
        </ul>
        Your facts are shared best as essential and with sturdy privacy safeguards in the region.
      </PolicySection>

      <PolicySection icon={Target} title="Purpose and Scope of Data Processing">
      The non-public data we accumulate is processed for specific purposes, such as:
      <ul className="list-disc pl-5">
          <li><strong>Providing Services:</strong> Enabling belongings listings, purchases, leases, and related sports.</li>
          <li><strong>Improving User Experience:</strong> Tailoring content material and capabilities based on your alternatives.</li>
          <li>
          <strong>Compliance:</strong> Meeting felony and regulatory requirements.
          </li>
          <li>
          <strong>Marketing and Communications:</strong> Sending you gives, updates, and guidelines aligned with your pursuits.
          </li>
          <li>
          <strong>Fraud Prevention:</strong> Monitoring for and mitigating fraudulent sports to protect our customers and platform.
          </li>
        </ul>
        Our purpose is to ensure that facts processing remains transparent, lawful, and aligned with the expectations of our users.
      </PolicySection>
    </div>
  );
};

export default PrivacyPolicy;
