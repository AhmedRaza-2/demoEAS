import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesPricingSection } from './components/ServicesPricingSection';
import { PPFFeaturesSection } from './components/PPFFeaturesSection';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { InteractiveMapContact } from './components/InteractiveMapContact';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { CustomerBookingsModal } from './components/CustomerBookingsModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { INITIAL_BOOKINGS, COMPANY_INFO } from './data/mockData';
import { Booking, ContactMessage, UserProfile } from './types';
import { 
  auth, db, onAuthStateChanged, User, collection, onSnapshot, doc, getDoc, 
  signInWithGoogle, signOutUser 
} from './lib/firebase';

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Persistent / dynamic booking state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('empire_auto_spa_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BOOKINGS;
      }
    }
    return INITIAL_BOOKINGS;
  });

  // Dynamic Contact inquiries state
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('empire_auto_spa_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [activeSection, setActiveSection] = useState<string>('services');

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);

      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userSnapshot = await getDoc(userDocRef);
          if (userSnapshot.exists()) {
            setUserProfile(userSnapshot.data() as UserProfile);
          } else {
            const initialProfile: UserProfile = {
              id: currentUser.uid,
              uid: currentUser.uid,
              displayName: currentUser.displayName || 'Customer',
              email: currentUser.email || '',
              photoURL: currentUser.photoURL || undefined,
              role: currentUser.email?.includes('admin') ? 'admin' : 'customer',
              createdAt: new Date().toISOString()
            };
            setUserProfile(initialProfile);
          }
        } catch (err) {
          console.warn('Error fetching user profile from Firestore:', err);
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Firestore Real-Time Bookings Listener
  useEffect(() => {
    try {
      const bookingsCol = collection(db, 'bookings');
      const unsubscribe = onSnapshot(
        bookingsCol,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedBookings: Booking[] = [];
            snapshot.forEach((doc) => {
              fetchedBookings.push(doc.data() as Booking);
            });
            // Sort by createdAt descending
            fetchedBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setBookings(fetchedBookings);
            localStorage.setItem('empire_auto_spa_bookings', JSON.stringify(fetchedBookings));
          }
        },
        (error) => {
          console.warn('Firestore bookings snapshot listener:', error);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore subscription failed, using local cache:', err);
    }
  }, []);

  // Firestore Real-Time Inquiries Listener
  useEffect(() => {
    try {
      const inquiriesCol = collection(db, 'inquiries');
      const unsubscribe = onSnapshot(
        inquiriesCol,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedMsgs: ContactMessage[] = [];
            snapshot.forEach((doc) => {
              fetchedMsgs.push(doc.data() as ContactMessage);
            });
            fetchedMsgs.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            setContactMessages(fetchedMsgs);
            localStorage.setItem('empire_auto_spa_inquiries', JSON.stringify(fetchedMsgs));
          }
        },
        (error) => {
          console.warn('Firestore inquiries snapshot listener:', error);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore inquiries subscription failed:', err);
    }
  }, []);

  // Filter bookings for logged-in user
  const userBookings = bookings.filter((b) => {
    if (user && b.userId === user.uid) return true;
    if (user?.email && b.email && b.email.toLowerCase() === user.email.toLowerCase()) return true;
    if (userProfile?.phoneNumber && b.phone && b.phone.includes(userProfile.phoneNumber)) return true;
    return false;
  });

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceForBooking(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev.filter((b) => b.id !== newBooking.id)]);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: Booking['status'], adminNotes?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              ...(adminNotes !== undefined ? { adminNotes } : {}),
              ...(newStatus === 'confirmed' ? { confirmedAt: new Date().toISOString() } : {})
            }
          : b
      )
    );
  };

  const handleMessageSubmitted = (newMsg: ContactMessage) => {
    setContactMessages((prev) => [newMsg, ...prev.filter((m) => m.id !== newMsg.id)]);
  };

  const handleExplorePackages = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setIsAuthOpen(false);
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Sign Out failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 selection:bg-[#00E5FF] selection:text-black">
      
      {/* Main Sticky Navbar with Auth & Bookings triggers */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        activeSection={activeSection}
        user={user}
        userProfile={userProfile}
        userBookingsCount={userBookings.length}
      />

      {/* Hero Section */}
      <main>
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onExplorePackages={handleExplorePackages}
        />

        {/* Before & After Transformations Slider */}
        <BeforeAfterSlider />

        {/* Full Services Menu & Pricing */}
        <ServicesPricingSection
          onSelectService={handleOpenBooking}
        />

        {/* Paint Protection Film (PPF) Deep Dive */}
        <PPFFeaturesSection
          onOpenBooking={handleOpenBooking}
        />

        {/* Instagram Studio Showcase & Real-Time Feed */}
        <InstagramFeedSection
          onOpenBooking={handleOpenBooking}
        />

        {/* Real-time Google Reviews & Ratings */}
        <GoogleReviewsSection />

        {/* Blog & Educational Guides */}
        <BlogSection
          onOpenBooking={handleOpenBooking}
        />

        {/* Studio Location & Interactive Map & Contact Form */}
        <InteractiveMapContact
          onMessageSubmitted={handleMessageSubmitted}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Booking & Instant Quote Modal (Connected to Firestore) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={selectedServiceForBooking}
        user={user}
        userProfile={userProfile}
        onBookingCreated={handleBookingCreated}
      />

      {/* Customer Passes & Appointments Modal */}
      <CustomerBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={user ? userBookings : bookings.slice(0, 3)}
        user={user}
        onOpenBookingNew={() => {
          setIsMyBookingsOpen(false);
          setIsBookingOpen(true);
        }}
        onOpenAuth={() => {
          setIsMyBookingsOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* Google Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        userProfile={userProfile}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
      />

      {/* Protected Admin Studio Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        contactMessages={contactMessages}
        isGoogleAdmin={userProfile?.role === 'admin'}
      />

      {/* Floating WhatsApp Quick Response Widget */}
      <FloatingWhatsApp />

    </div>
  );
}
