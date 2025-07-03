# Healthcare Clinical Laboratory - Vercel Deployment

This is the web interface for the Healthcare Clinical Laboratory system, designed to be deployed on Vercel.

## Features

- **Patient Report Access**: Secure login with Patient ID and Password
- **Real-time Data**: Fetches data directly from Firebase Firestore
- **PDF Generation**: Client-side PDF creation using jsPDF
- **Responsive Design**: Works on desktop and mobile devices
- **Print Support**: Direct browser printing functionality

## Deployment Instructions

### Quick Deploy to Vercel

1. **Upload to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Create an account or sign in
   - Click "New Project"
   - Upload this folder or connect your Git repository

2. **Deploy:**
   - Vercel will automatically detect the configuration
   - The app will be deployed and available at your Vercel URL

### Manual Setup

1. **Install Vercel CLI (optional):**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

## Configuration

The Firebase configuration is already included in the `index.html` file:

- **Project ID**: healthcare-33ed4
- **Firebase Web App**: Configured for your specific project
- **Firestore**: Reads from the `reports` collection

## Usage

### For Patients

1. **Visit the deployed URL**
2. **Enter credentials:**
   - Patient ID (provided by the lab)
   - Password (provided by the lab)
3. **View report online**
4. **Download PDF** or **Print** as needed

### QR Code Integration

The desktop application generates QR codes that link to this web interface with pre-filled credentials for seamless patient access.

## Files Included

- `index.html` - Main web application
- `vercel.json` - Vercel deployment configuration
- `README.md` - This documentation

## Security Features

- **Firebase Authentication**: Secure data access through Firebase
- **Password Protection**: Reports require both Patient ID and Password
- **Client-side Processing**: No server-side data storage
- **HTTPS**: Vercel provides automatic HTTPS

## Browser Compatibility

- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**
- **Mobile browsers**

## Support

For technical support, refer to the main lab management system documentation or contact the development team.

---

**Software by Saeed** | Healthcare Clinical Laboratory