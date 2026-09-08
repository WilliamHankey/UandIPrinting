
import { CartItem } from '@/context/CartContext';

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

// Format cart items for the WhatsApp message
const formatOrderItemsForMessage = (items: CartItem[], totalPrice: number) => {
  const itemsList = items.map(item => 
    `• ${item.title} (${item.category}) - R${item.price.toFixed(2)} x ${item.quantity || 1} = R${(item.price * (item.quantity || 1)).toFixed(2)}`
  ).join('\n');

  return `Order Details:
${itemsList}

Total: R${totalPrice.toFixed(2)}`;
};

// Send WhatsApp notification via link
export const sendWhatsAppNotification = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Open WhatsApp with the message prefilled
  window.open(whatsappUrl, '_blank');
};

// Main function to send order/requirements via WhatsApp
export const sendOrderNotifications = async (
  items: CartItem[], 
  totalPrice: number,
  contactFormData?: Record<string, string>
) => {
  const orderId = generateOrderId();
  const date = new Date().toLocaleDateString();

  // Build the message body
  let message = `*New Order Request #${orderId}*\n\n${formatOrderItemsForMessage(items, totalPrice)}`;

  // Add contact form data if available
  if (contactFormData) {
    const contactDetails = Object.entries(contactFormData)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join('\n');

    message = `*New Order Request #${orderId}*\n\nContact Information:\n${contactDetails}\n\n${formatOrderItemsForMessage(items, totalPrice)}`;
  }

  sendWhatsAppNotification(message);

  return { orderId, date };
};
