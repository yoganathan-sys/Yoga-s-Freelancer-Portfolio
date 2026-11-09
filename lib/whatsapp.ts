export const WHATSAPP_DESTINATION_NUMBER = "919025281363";

/**
 * Formats a clean, professional WhatsApp prefilled message containing all enquiry fields
 */
export function buildWhatsAppMessage(params: {
  fullName: string;
  email: string;
  phone?: string | null;
  projectType: string;
  budgetRange?: string | null;
  projectDescription: string;
}): string {
  const phoneText =
    params.phone && params.phone.trim() ? params.phone.trim() : "Not Provided";
  const budgetText =
    params.budgetRange && params.budgetRange.trim()
      ? params.budgetRange.trim()
      : "Not Specified";

  return `NEW CLIENT PROJECT ENQUIRY

Hello Yoganathan!
You have received a new project enquiry through your portfolio website.

CUSTOMER DETAILS
Full Name: ${params.fullName}
Email Address: ${params.email}
Phone / WhatsApp: ${phoneText}

PROJECT INFORMATION
Project Type: ${params.projectType}
Budget Range: ${budgetText}

PROJECT DESCRIPTION
${params.projectDescription}

SOURCE
Yoganathan's Freelancer Portfolio
Please review this project enquiry and contact the customer.`;
}

/**
 * Generates the official WhatsApp Click to Chat URL with URL-encoded message
 */
export function buildWhatsAppUrl(params: {
  fullName: string;
  email: string;
  phone?: string | null;
  projectType: string;
  budgetRange?: string | null;
  projectDescription: string;
}): string {
  const message = buildWhatsAppMessage(params);
  return `https://wa.me/${WHATSAPP_DESTINATION_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

