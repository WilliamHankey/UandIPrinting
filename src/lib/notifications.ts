
import { CartItem } from '@/context/CartContext';

const EMAIL_RECIPIENT = 'uandiprinting@outlook.com';
const WHATSAPP_NUMBER = '27722711306';

interface OrderDetails {
  items: CartItem[];
  totalPrice: number;
  date: string;
  orderId: string;
}

// Function to generate a random order ID
const generateOrderId = () => {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
};

// Format cart items for email
const formatOrderItemsForEmail = (items: CartItem[], totalPrice: number) => {
  const itemsList = items.map(item => 
    `• ${item.title} (${item.category}) - R${item.price.toFixed(2)} x ${item.quantity} = R${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');
  
  return `
Order Details:
${itemsList}

Total: R${totalPrice.toFixed(2)}
  `;
};

// Send WhatsApp notification via link
export const sendWhatsAppNotification = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
};

// Send email notification via mailto
export const sendEmailNotification = (subject: string, body: string) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  const mailtoUrl = `mailto:${EMAIL_RECIPIENT}?subject=${encodedSubject}&body=${encodedBody}`;
  
  // Open email client
  window.location.href = mailtoUrl;
};

// Main function to send all notifications
export const sendOrderNotifications = async (
  items: CartItem[], 
  totalPrice: number,
  contactFormData?: Record<string, string>
) => {
  const orderId = generateOrderId();
  const date = new Date().toLocaleDateString();
  
  // Format email subject and body
  let emailSubject = `New Order #${orderId}`;
  let emailBody = formatOrderItemsForEmail(items, totalPrice);
  
  // Add contact form data if available
  if (contactFormData) {
    emailSubject = `New Order Request #${orderId}`;
    const contactDetails = Object.entries(contactFormData)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join('\n');
      
    emailBody = `Contact Information:\n${contactDetails}\n\n${emailBody}`;
  }
  
  // WhatsApp message
  const whatsappMessage = `New order #${orderId} has been placed. Please check your email for details.`;
  
  // Send notifications
  sendEmailNotification(emailSubject, emailBody);
  sendWhatsAppNotification(whatsappMessage);
  
  return { orderId, date };
};
