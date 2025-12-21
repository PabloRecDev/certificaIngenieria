"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Envelope,
  User,
  UserCircle,
  SignOut,
  FileText,
  UsersThree,
  ChartBar,
  SquaresFour,
  Plus,
  PencilSimpleLine,
  Trash,
  DotsThree,
  MagnifyingGlass,
  CheckCircle,
  XCircle,
  Warning,
  Clock,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Phone,
  Calendar,
  Image,
  X,
} from "phosphor-react";
import { supabase } from "@/lib/supabaseClient";
import blogPostsData from "@/data/blog/blogPosts.json";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
};

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "new" | "in_progress" | "closed";
  created_at: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type AlertType = {
  id: string;
  type: "success" | "error" | "warning" | "confirm";
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "posts" | "contacts" | "leads">("dashboard");
  const [posts, setPosts] = useState<BlogPost[]>(blogPostsData as BlogPost[]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [postFilter, setPostFilter] = useState("");
  const [leadFilter, setLeadFilter] = useState("");
  const [contactFilter, setContactFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "in_progress" | "closed">("all");
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "" });
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [openPostMenuId, setOpenPostMenuId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    excerpt: "",
    date: "",
    readTime: "",
    category: "",
    imageUrl: "",
    slug: "",
  });
  const [postImageFile, setPostImageFile] = useState<File | null>(null);
  const [postImagePreview, setPostImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
      loadContacts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Resetear filtros al cambiar de pestaña
    if (activeTab !== "leads") {
      setStatusFilter("all");
      setLeadFilter("");
    }
    // Cerrar menús al cambiar de pestaña
    setOpenMenuId(null);
    setOpenPostMenuId(null);
  }, [activeTab]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId) {
        setOpenMenuId(null);
      }
      if (openPostMenuId) {
        setOpenPostMenuId(null);
      }
    };
    
    if (openMenuId || openPostMenuId) {
      // Usar setTimeout para evitar que se cierre inmediatamente al abrir
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openMenuId, openPostMenuId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      setUserEmail(session.user.email || "");
    }
  };

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error loading leads:", error);
    }
  };

  const loadContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const handleCreateContact = async () => {
    if (!contactForm.name.trim() || !contactForm.email.trim()) {
      return;
    }

    try {
      const { error } = await supabase
        .from("contacts")
        .insert({
          name: contactForm.name.trim(),
          email: contactForm.email.trim().toLowerCase(),
        });

      if (error) throw error;
      
      await loadContacts();
      setIsCreatingContact(false);
      setContactForm({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  const handleUpdateContact = async () => {
    if (!editingContact || !contactForm.name.trim() || !contactForm.email.trim()) {
      return;
    }

    try {
      const { error } = await supabase
        .from("contacts")
        .update({
          name: contactForm.name.trim(),
          email: contactForm.email.trim().toLowerCase(),
        })
        .eq("id", editingContact.id);

      if (error) throw error;
      
      await loadContacts();
      setEditingContact(null);
      setContactForm({ name: "", email: "" });
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const showAlert = (alert: Omit<AlertType, "id">) => {
    const id = Math.random().toString(36).substring(7);
    setAlerts([...alerts, { ...alert, id }]);
    return id;
  };

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    const id = Math.random().toString(36).substring(7);
    setAlerts([
      ...alerts,
      {
        id,
        type: "confirm",
        title,
        message,
        onConfirm: () => {
          onConfirm();
          removeAlert(id);
        },
        onCancel: () => {
          if (onCancel) onCancel();
          removeAlert(id);
        },
      },
    ]);
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const handleDeleteContact = async (id: string) => {
    showConfirm(
      "Eliminar contacto",
      "¿Estás seguro de que quieres eliminar este contacto? Esta acción no se puede deshacer.",
      async () => {
        try {
          const { error } = await supabase
            .from("contacts")
            .delete()
            .eq("id", id);

          if (error) throw error;
          
          await loadContacts();
          showAlert({
            type: "success",
            title: "Contacto eliminado",
            message: "El contacto ha sido eliminado correctamente.",
          });
        } catch (error) {
          console.error("Error deleting contact:", error);
          showAlert({
            type: "error",
            title: "Error",
            message: "No se pudo eliminar el contacto. Inténtalo de nuevo.",
          });
        }
      }
    );
  };

  const startEditing = (contact: Contact) => {
    setEditingContact(contact);
    setContactForm({ name: contact.name, email: contact.email });
  };

  const cancelEditing = () => {
    setEditingContact(null);
    setIsCreatingContact(false);
    setContactForm({ name: "", email: "" });
  };

  const handleCreatePost = async () => {
    if (!postForm.title.trim() || !postForm.excerpt.trim() || !postForm.slug.trim()) {
      return;
    }

    let imageUrl = postForm.imageUrl.trim();
    
    // Si hay un archivo seleccionado, subirlo primero
    if (postImageFile) {
      const uploadedUrl = await uploadImageToSupabase(postImageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    // Si no hay imagen, usar una por defecto
    if (!imageUrl) {
      imageUrl = "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1200";
    }

    const newPost: BlogPost = {
      id: String(posts.length + 1),
      title: postForm.title.trim(),
      excerpt: postForm.excerpt.trim(),
      date: postForm.date.trim() || new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }),
      readTime: postForm.readTime.trim() || "5 min",
      category: postForm.category.trim() || "General",
      imageUrl: imageUrl,
      slug: postForm.slug.trim().toLowerCase().replace(/\s+/g, "-"),
    };

    setPosts([newPost, ...posts]);
    setIsCreatingPost(false);
    setPostForm({
      title: "",
      excerpt: "",
      date: "",
      readTime: "",
      category: "",
      imageUrl: "",
      slug: "",
    });
    setPostImageFile(null);
    setPostImagePreview("");
  };

  const handleUpdatePost = async () => {
    if (!editingPost || !postForm.title.trim() || !postForm.excerpt.trim() || !postForm.slug.trim()) {
      return;
    }

    let imageUrl = postForm.imageUrl.trim();
    
    // Si hay un archivo seleccionado, subirlo primero
    if (postImageFile) {
      const uploadedUrl = await uploadImageToSupabase(postImageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const updatedPosts = posts.map((post) =>
      post.id === editingPost.id
        ? {
            ...post,
            title: postForm.title.trim(),
            excerpt: postForm.excerpt.trim(),
            date: postForm.date.trim(),
            readTime: postForm.readTime.trim(),
            category: postForm.category.trim(),
            imageUrl: imageUrl || post.imageUrl,
            slug: postForm.slug.trim().toLowerCase().replace(/\s+/g, "-"),
          }
        : post
    );

    setPosts(updatedPosts);
    setEditingPost(null);
    setPostForm({
      title: "",
      excerpt: "",
      date: "",
      readTime: "",
      category: "",
      imageUrl: "",
      slug: "",
    });
    setPostImageFile(null);
    setPostImagePreview("");
  };

  const handleDeletePost = (id: string) => {
    showConfirm(
      "Eliminar post",
      "¿Estás seguro de que quieres eliminar este post? Esta acción no se puede deshacer.",
      () => {
        setPosts(posts.filter((post) => post.id !== id));
        showAlert({
          type: "success",
          title: "Post eliminado",
          message: "El post ha sido eliminado correctamente.",
        });
      }
    );
  };

  const startEditingPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      category: post.category,
      imageUrl: post.imageUrl,
      slug: post.slug,
    });
    setPostImageFile(null);
    setPostImagePreview("");
  };

  const cancelEditingPost = () => {
    setEditingPost(null);
    setIsCreatingPost(false);
    setPostForm({
      title: "",
      excerpt: "",
      date: "",
      readTime: "",
      category: "",
      imageUrl: "",
      slug: "",
    });
    setPostImageFile(null);
    setPostImagePreview("");
  };

  const handleImageSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      showAlert({
        type: "error",
        title: "Imagen demasiado grande",
        message: "La imagen es demasiado grande. El tamaño máximo permitido es 10MB.",
      });
      return;
    }

    setPostImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPostImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        // Si falla la subida, usar la URL local como fallback
        return postImagePreview;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return postImagePreview; // Fallback a preview local
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setLoginError("Introduce tu correo y tu contraseña para acceder.");
      return;
    }

    setLoginError(null);
    setLoginLoading(true);

    try {
      // Verificar que Supabase esté configurado
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        setLoginError("Error de configuración: Faltan las variables de entorno de Supabase.");
        setLoginLoading(false);
        return;
      }

      console.log("Intentando iniciar sesión con:", loginForm.email);
      console.log("Supabase URL:", supabaseUrl ? "Configurada" : "No configurada");

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email.trim(),
        password: loginForm.password,
      });

      if (error) {
        console.error("Error de autenticación completo:", {
          message: error.message,
          status: error.status,
          name: error.name,
        });
        
        if (error.message.includes("Invalid login credentials") || error.status === 400) {
          setLoginError(
            "Correo o contraseña incorrectos. " +
            "Verifica que: 1) El usuario existe en Supabase Dashboard > Authentication > Users, " +
            "2) El email es exactamente el mismo (sin espacios), " +
            "3) La contraseña es correcta, " +
            "4) El usuario está confirmado (debe tener 'Auto Confirm User' o email_confirmed_at no nulo). " +
            "Si el usuario no está confirmado, elimínalo y créalo de nuevo con 'Auto Confirm User' marcado."
          );
        } else if (error.message.includes("Email not confirmed")) {
          setLoginError("Por favor, confirma tu email antes de iniciar sesión. Ve a Supabase Dashboard > Authentication > Users y marca 'Auto Confirm User'.");
        } else {
          setLoginError(`Error: ${error.message || "Error al iniciar sesión. Verifica tu conexión y las credenciales."}`);
        }
        setLoginLoading(false);
        return;
      }

      if (data.user) {
        console.log("Login exitoso:", data.user.email);
        setIsAuthenticated(true);
        setUserEmail(data.user.email || "");
      } else {
        setLoginError("No se recibió información del usuario. Inténtalo de nuevo.");
      }
    } catch (error: any) {
      console.error("Error inesperado completo:", error);
      setLoginError(error.message || "Error inesperado. Verifica la consola para más detalles.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserEmail("");
    router.push("/admin");
  };

  const updateLeadStatus = async (id: string, status: Lead["status"]) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      await loadLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen">
        {/* Panel izquierdo 70% */}
        <div className="relative flex w-[70%] flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 px-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-purple-100/30 blur-3xl"></div>
          </div>

          <div className="relative z-10 w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <img
                  src="/assets/logo.png"
                  alt="Certifica Ingeniería"
                  className="h-16 w-auto drop-shadow-sm"
                />
              </motion.div>
              
              <div className="mb-6">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600"
                >
                  Panel de administración
                </motion.span>
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-6xl font-bold tracking-tight text-transparent"
              >
                Gestiona tu contenido
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-slate-600 leading-relaxed"
              >
                Administra artículos del blog, contactos y solicitudes desde un
                panel centralizado y fácil de usar.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30">
                    <FileText size={24} weight="duotone" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    Blog
                  </h3>
                  <p className="text-sm text-slate-600">
                    Crea y edita artículos para la web
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30">
                    <UsersThree size={24} weight="duotone" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    Contactos
                  </h3>
                  <p className="text-sm text-slate-600">
                    Gestiona leads y solicitudes
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30">
                    <ChartBar size={24} weight="duotone" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    Analytics
                  </h3>
                  <p className="text-sm text-slate-600">
                    Métricas y estadísticas
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Panel derecho 30% - Login */}
        <div className="relative flex w-[30%] items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-950 px-10">
          <div className="absolute inset-0">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 w-full max-w-sm"
          >
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-4 flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  <UserCircle size={24} weight="duotone" className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Iniciar sesión
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-slate-400"
              >
                Accede con tus credenciales corporativas
              </motion.p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300"
                >
                  Correo electrónico
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Envelope
                      size={20}
                      weight="duotone"
                      className="text-slate-500 transition-colors group-focus-within:text-white"
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    className="block w-full rounded-xl border border-slate-800 bg-slate-900/50 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-sm transition-all focus:border-slate-700 focus:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black"
                    placeholder="tu@correo.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300"
                >
                  Contraseña
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <User
                      size={20}
                      weight="duotone"
                      className="text-slate-500 transition-colors group-focus-within:text-white"
                    />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="block w-full rounded-xl border border-slate-800 bg-slate-900/50 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-sm transition-all focus:border-slate-700 focus:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>

              <AnimatePresence>
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <XCircle size={20} className="mt-0.5 flex-shrink-0 text-red-400" />
                      <p className="text-sm text-red-300">{loginError}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loginLoading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-white to-slate-100 px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all hover:shadow-xl hover:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loginLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                    <span>Iniciando sesión...</span>
                  </span>
                ) : (
                  <span className="relative z-10">Iniciar sesión</span>
                )}
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pt-6 text-center"
              >
                <p className="text-xs text-slate-500">
                  Acceso exclusivo para personal autorizado
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(postFilter.toLowerCase()) ||
    post.category.toLowerCase().includes(postFilter.toLowerCase())
  );

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(leadFilter.toLowerCase()) ||
      lead.email.toLowerCase().includes(leadFilter.toLowerCase()) ||
      lead.message.toLowerCase().includes(leadFilter.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(contactFilter.toLowerCase()) ||
      contact.email.toLowerCase().includes(contactFilter.toLowerCase())
    );
  });

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    inProgress: leads.filter((l) => l.status === "in_progress").length,
    closedLeads: leads.filter((l) => l.status === "closed").length,
    totalPosts: posts.length,
    recentLeads: leads.filter((l) => {
      const leadDate = new Date(l.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return leadDate >= weekAgo;
    }).length,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] font-ui text-slate-50">
      {/* Sidebar */}
      <aside className="flex h-screen w-60 flex-col border-r border-[#222] bg-[#181818] px-4 py-5">
        <div className="mb-6 flex flex-shrink-0 items-center gap-3">
          <img
            src="/assets/logoGoprime.png"
            alt="Go Prime"
            className="h-14 w-auto"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">CRM & ERP</span>
            <span className="text-[10px] text-slate-400">Sistema de gestión</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-[#ffde59] text-black"
                : "text-slate-400 hover:bg-[#222] hover:text-white"
            }`}
          >
            <SquaresFour size={20} weight="duotone" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "posts"
                ? "bg-[#ffde59] text-black"
                : "text-slate-400 hover:bg-[#222] hover:text-white"
            }`}
          >
            <FileText size={20} weight="duotone" />
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "leads"
                ? "bg-[#ffde59] text-black"
                : "text-slate-400 hover:bg-[#222] hover:text-white"
            }`}
          >
            <UserCircle size={20} weight="duotone" />
            Leads
            {stats.newLeads > 0 && (
              <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                {stats.newLeads}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "contacts"
                ? "bg-[#ffde59] text-black"
                : "text-slate-400 hover:bg-[#222] hover:text-white"
            }`}
          >
            <UsersThree size={20} weight="duotone" />
            Contactos
          </button>
        </nav>

        <div className="border-t border-[#222] pt-4">
          <div className="mb-3 flex items-center gap-3 px-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-medium text-white">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-medium text-white">{userEmail}</p>
              <p className="text-[10px] text-slate-400">Administrador</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-[#222] hover:text-white"
          >
            <SignOut size={18} weight="duotone" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="mt-2 text-slate-400">Resumen general del CRM</p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Leads</p>
                      <p className="mt-1 text-3xl font-bold text-white">{stats.totalLeads}</p>
                      {stats.recentLeads > 0 && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                          <Clock size={12} />
                          {stats.recentLeads} esta semana
                        </p>
                      )}
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 transition-transform group-hover:scale-110">
                      <UsersThree size={28} weight="duotone" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="group relative overflow-hidden rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6 transition-all hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Nuevos</p>
                      <p className="mt-1 text-3xl font-bold text-white">{stats.newLeads}</p>
                      {stats.newLeads > 0 && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-yellow-400">
                          <Warning size={12} weight="fill" />
                          Requieren atención
                        </p>
                      )}
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 text-yellow-400 transition-transform group-hover:scale-110">
                      <Warning size={28} weight="duotone" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group relative overflow-hidden rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">En Proceso</p>
                      <p className="mt-1 text-3xl font-bold text-white">{stats.inProgress}</p>
                      {stats.inProgress > 0 && (
                        <p className="mt-2 text-xs text-slate-500">
                          {Math.round((stats.inProgress / stats.totalLeads) * 100) || 0}% del total
                        </p>
                      )}
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 transition-transform group-hover:scale-110">
                      <ChartBar size={28} weight="duotone" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group relative overflow-hidden rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6 transition-all hover:border-[#ffde59]/50 hover:shadow-lg hover:shadow-[#ffde59]/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Posts</p>
                      <p className="mt-1 text-3xl font-bold text-white">{stats.totalPosts}</p>
                      <p className="mt-2 text-xs text-slate-500">Artículos publicados</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffde59]/20 to-[#ffde59]/10 text-[#ffde59] transition-transform group-hover:scale-110">
                      <FileText size={28} weight="duotone" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Leads Section */}
              {leads.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Leads Recientes</h2>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-sm text-[#ffde59] hover:text-[#ffd700]"
                    >
                      Ver todos →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {leads
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .slice(0, 5)
                      .map((lead) => (
                        <div
                          key={lead.id}
                          className="flex items-center justify-between rounded-lg border border-[#222] bg-[#0a0a0a] p-4 transition-colors hover:border-[#333]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffde59]/20 text-[#ffde59]">
                              <User size={18} weight="duotone" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{lead.name}</p>
                              <p className="text-xs text-slate-400">{lead.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                lead.status === "new"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : lead.status === "in_progress"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-[#ffde59]/20 text-[#ffde59]"
                              }`}
                            >
                              {lead.status === "new"
                                ? "Nuevo"
                                : lead.status === "in_progress"
                                ? "En Proceso"
                                : "Cerrado"}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(lead.created_at).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}

              {/* Stats Summary */}
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6"
                >
                  <h3 className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Distribución de Leads
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-300">Nuevos</span>
                        <span className="font-medium text-white">
                          {stats.newLeads} ({Math.round((stats.newLeads / stats.totalLeads) * 100) || 0}%)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#0a0a0a]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all"
                          style={{ width: `${(stats.newLeads / stats.totalLeads) * 100 || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-300">En Proceso</span>
                        <span className="font-medium text-white">
                          {stats.inProgress} ({Math.round((stats.inProgress / stats.totalLeads) * 100) || 0}%)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#0a0a0a]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                          style={{ width: `${(stats.inProgress / stats.totalLeads) * 100 || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-300">Cerrados</span>
                        <span className="font-medium text-white">
                          {stats.closedLeads} ({Math.round((stats.closedLeads / stats.totalLeads) * 100) || 0}%)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#0a0a0a]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#ffde59] to-[#ffd700] transition-all"
                          style={{ width: `${(stats.closedLeads / stats.totalLeads) * 100 || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6"
                >
                  <h3 className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Acciones Rápidas
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="w-full flex items-center justify-between rounded-lg border border-[#222] bg-[#0a0a0a] p-4 text-left transition-colors hover:border-[#ffde59] hover:bg-[#111]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffde59]/20 text-[#ffde59]">
                          <UserCircle size={20} weight="duotone" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Gestionar Leads</p>
                          <p className="text-xs text-slate-400">{stats.totalLeads} leads disponibles</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-slate-400" />
                    </button>
                    <button
                      onClick={() => setActiveTab("posts")}
                      className="w-full flex items-center justify-between rounded-lg border border-[#222] bg-[#0a0a0a] p-4 text-left transition-colors hover:border-[#ffde59] hover:bg-[#111]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                          <FileText size={20} weight="duotone" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Gestionar Posts</p>
                          <p className="text-xs text-slate-400">{stats.totalPosts} artículos</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-slate-400" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === "posts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
                  <p className="mt-2 text-slate-400">Gestiona los artículos del blog</p>
                </div>
                <button
                  onClick={() => {
                    setIsCreatingPost(true);
                    setPostForm({
                      title: "",
                      excerpt: "",
                      date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }),
                      readTime: "5 min",
                      category: "",
                      imageUrl: "",
                      slug: "",
                    });
                  }}
                  className="flex items-center gap-2 rounded-lg bg-[#ffde59] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#ffd700]"
                >
                  <Plus size={18} weight="bold" />
                  Nuevo Post
                </button>
              </div>

              <div className="relative">
                <MagnifyingGlass
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Buscar posts..."
                  value={postFilter}
                  onChange={(e) => setPostFilter(e.target.value)}
                  className="w-full rounded-lg border border-[#222] bg-[#181818] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                />
              </div>

              {/* Formulario de creación/edición */}
              <AnimatePresence>
                {(isCreatingPost || editingPost) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-lg border border-[#ffde59]/30 bg-[#181818] p-4"
                  >
                    <div className="space-y-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Título"
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          className="rounded border border-[#222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Slug (URL amigable)"
                          value={postForm.slug}
                          onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                          className="rounded border border-[#222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                        />
                      </div>
                      <textarea
                        placeholder="Resumen (excerpt)"
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                        rows={3}
                        className="w-full rounded border border-[#222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                      />
                      <div className="grid gap-3 md:grid-cols-4">
                        <input
                          type="text"
                          placeholder="Fecha (ej: 15 Mar 2024)"
                          value={postForm.date}
                          onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
                          className="rounded border border-[#222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Tiempo lectura (ej: 5 min)"
                          value={postForm.readTime}
                          onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                          className="rounded border border-[#222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Categoría"
                          value={postForm.category}
                          onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                          className="rounded border border-[#222] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                        />
                      </div>
                      {/* Área de drag and drop para imagen */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Imagen del post</label>
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            const file = e.dataTransfer.files[0];
                            if (file && file.type.startsWith("image/")) {
                              handleImageSelect(file);
                            }
                          }}
                          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                            isDragging
                              ? "border-[#ffde59] bg-[#ffde59]/5"
                              : "border-[#222] bg-[#0a0a0a] hover:border-[#333]"
                          } ${postImagePreview ? "p-2" : "p-8"}`}
                        >
                          {postImagePreview ? (
                            <div className="relative w-full">
                              <img
                                src={postImagePreview}
                                alt="Preview"
                                className="h-48 w-full rounded object-cover"
                              />
                              <button
                                onClick={() => {
                                  setPostImageFile(null);
                                  setPostImagePreview("");
                                  setPostForm({ ...postForm, imageUrl: "" });
                                }}
                                className="absolute right-2 top-2 rounded-full bg-red-500/90 p-1.5 text-white transition-colors hover:bg-red-600"
                              >
                                <X size={16} weight="bold" />
                              </button>
                            </div>
                          ) : postForm.imageUrl ? (
                            <div className="relative w-full">
                              <img
                                src={postForm.imageUrl}
                                alt="Current"
                                className="h-48 w-full rounded object-cover"
                              />
                              <button
                                onClick={() => {
                                  setPostForm({ ...postForm, imageUrl: "" });
                                }}
                                className="absolute right-2 top-2 rounded-full bg-red-500/90 p-1.5 text-white transition-colors hover:bg-red-600"
                              >
                                <X size={16} weight="bold" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Image size={32} className="mb-2 text-slate-400" weight="duotone" />
                              <p className="text-sm text-slate-400">
                                Arrastra una imagen aquí o{" "}
                                <label className="cursor-pointer text-[#ffde59] hover:text-[#ffd700]">
                                  haz clic para seleccionar
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleImageSelect(file);
                                      }
                                    }}
                                  />
                                </label>
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                PNG, JPG, GIF hasta 10MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-3">
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={editingPost ? handleUpdatePost : handleCreatePost}
                          disabled={uploadingImage}
                          className="rounded bg-[#ffde59] px-4 py-2 text-sm font-medium text-black hover:bg-[#ffd700] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {uploadingImage ? "Subiendo..." : editingPost ? "Guardar" : "Crear"}
                        </button>
                        <button
                          onClick={cancelEditingPost}
                          disabled={uploadingImage}
                          className="rounded border border-[#222] bg-[#0a0a0a] px-4 py-2 text-sm font-medium text-slate-400 hover:border-[#333] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid gap-4">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6 transition-all hover:border-[#ffde59]/50 hover:shadow-lg hover:shadow-[#ffde59]/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded-full bg-[#ffde59]/20 px-2.5 py-1 text-xs font-medium text-[#ffde59]">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#ffde59] transition-colors">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-400 line-clamp-2">{post.excerpt}</p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenPostMenuId(openPostMenuId === post.id ? null : post.id);
                          }}
                          className={`rounded p-1.5 text-slate-400 transition-all ${
                            openPostMenuId === post.id
                              ? "bg-[#222] text-white"
                              : "hover:bg-[#222] hover:text-white"
                          }`}
                          title="Opciones"
                        >
                          <DotsThree size={16} weight="bold" />
                        </button>
                        <AnimatePresence>
                          {openPostMenuId === post.id && (
                            <>
                              {/* Backdrop para cerrar al hacer clic fuera */}
                              <div
                                className="fixed inset-0 z-[5]"
                                onClick={() => setOpenPostMenuId(null)}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                transition={{ duration: 0.15 }}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-9 z-10 w-36 overflow-hidden rounded-lg border border-[#333] bg-[#1a1a1a] shadow-xl shadow-black/50 backdrop-blur-sm"
                              >
                                <button
                                  onClick={() => {
                                    startEditingPost(post);
                                    setOpenPostMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-slate-200 transition-colors hover:bg-[#222]"
                                >
                                  <PencilSimpleLine size={16} weight="duotone" />
                                  <span>Editar</span>
                                </button>
                                <div className="h-px bg-[#222]" />
                                <button
                                  onClick={() => {
                                    handleDeletePost(post.id);
                                    setOpenPostMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-slate-200 transition-colors hover:bg-[#222]"
                                >
                                  <Trash size={16} weight="duotone" />
                                  <span>Eliminar</span>
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filteredPosts.length === 0 && (
                  <div className="rounded-xl border border-[#222] bg-[#181818] p-12 text-center">
                    <FileText size={48} className="mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">No se encontraron posts</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Leads</h1>
                  <p className="mt-2 text-slate-400">Gestiona todos los leads y oportunidades</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg border border-[#222] bg-[#181818] px-3 py-1.5">
                    <span className="text-xs text-slate-400">Total:</span>
                    <span className="text-sm font-semibold text-white">{stats.totalLeads}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-[#222] bg-[#181818] px-3 py-1.5">
                    <span className="text-xs text-slate-400">Nuevos:</span>
                    <span className="text-sm font-semibold text-yellow-400">{stats.newLeads}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                    statusFilter === "all"
                      ? "border-[#ffde59] bg-[#ffde59]/10"
                      : "border-[#222] bg-[#181818] hover:border-[#333]"
                  }`}
                >
                  <div className="text-sm font-medium text-white">Todos</div>
                  <div className="mt-1 text-xs text-slate-400">{stats.totalLeads} leads</div>
                </button>
                <button
                  onClick={() => setStatusFilter("new")}
                  className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                    statusFilter === "new"
                      ? "border-yellow-500/50 bg-yellow-500/10"
                      : "border-[#222] bg-[#181818] hover:border-[#333]"
                  }`}
                >
                  <div className="text-sm font-medium text-white">Nuevos</div>
                  <div className="mt-1 text-xs text-yellow-400">{stats.newLeads} leads</div>
                </button>
                <button
                  onClick={() => setStatusFilter("in_progress")}
                  className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                    statusFilter === "in_progress"
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-[#222] bg-[#181818] hover:border-[#333]"
                  }`}
                >
                  <div className="text-sm font-medium text-white">En Proceso</div>
                  <div className="mt-1 text-xs text-blue-400">{stats.inProgress} leads</div>
                </button>
                <button
                  onClick={() => setStatusFilter("closed")}
                  className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                    statusFilter === "closed"
                      ? "border-[#ffde59]/50 bg-[#ffde59]/10"
                      : "border-[#222] bg-[#181818] hover:border-[#333]"
                  }`}
                >
                  <div className="text-sm font-medium text-white">Cerrados</div>
                  <div className="mt-1 text-xs text-[#ffde59]">{stats.closedLeads} leads</div>
                </button>
              </div>

              <div className="relative">
                <MagnifyingGlass
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Buscar leads por nombre, email o mensaje..."
                  value={leadFilter}
                  onChange={(e) => setLeadFilter(e.target.value)}
                  className="w-full rounded-lg border border-[#222] bg-[#181818] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                />
              </div>

              <div className="grid gap-4">
                {filteredLeads.map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-xl border border-[#222] bg-gradient-to-br from-[#181818] to-[#0f0f0f] p-6 transition-all hover:border-[#ffde59]/50 hover:shadow-lg hover:shadow-[#ffde59]/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffde59]/20 text-[#ffde59]">
                            <UserCircle size={20} weight="duotone" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                  lead.status === "new"
                                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                    : lead.status === "in_progress"
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    : "bg-[#ffde59]/20 text-[#ffde59] border border-[#ffde59]/30"
                                }`}
                              >
                                {lead.status === "new"
                                  ? "Nuevo"
                                  : lead.status === "in_progress"
                                  ? "En Proceso"
                                  : "Cerrado"}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-sm">
                              <a
                                href={`mailto:${lead.email}`}
                                className="flex items-center gap-1.5 text-slate-300 hover:text-[#ffde59] transition-colors"
                              >
                                <Envelope size={14} weight="duotone" />
                                {lead.email}
                              </a>
                              {lead.phone && (
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="flex items-center gap-1.5 text-slate-400 hover:text-[#ffde59] transition-colors"
                                >
                                  <Phone size={14} weight="duotone" />
                                  {lead.phone}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 rounded-lg border border-[#222] bg-[#0a0a0a] p-3">
                          <p className="text-sm text-slate-300">{lead.message}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={12} />
                          <span>
                            {new Date(lead.created_at).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {lead.status !== "new" && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, "new")}
                            className="rounded-lg border border-[#222] bg-[#0a0a0a] px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:border-yellow-600 hover:bg-yellow-600/10 hover:text-yellow-400"
                          >
                            Marcar nuevo
                          </button>
                        )}
                        {lead.status !== "in_progress" && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, "in_progress")}
                            className="rounded-lg border border-[#222] bg-[#0a0a0a] px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:border-blue-600 hover:bg-blue-600/10 hover:text-blue-400"
                          >
                            En proceso
                          </button>
                        )}
                        {lead.status !== "closed" && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, "closed")}
                            className="rounded-lg border border-[#222] bg-[#0a0a0a] px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:border-[#ffde59] hover:bg-[#ffde59]/10 hover:text-[#ffde59]"
                          >
                            Cerrar
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filteredLeads.length === 0 && (
                  <div className="rounded-xl border border-[#222] bg-[#181818] p-12 text-center">
                    <UserCircle size={48} className="mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">No hay leads disponibles</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Contactos</h1>
                  <p className="mt-1 text-sm text-slate-400">Gestiona los contactos de clientes</p>
                </div>
                <button
                  onClick={() => {
                    setIsCreatingContact(true);
                    setContactForm({ name: "", email: "" });
                  }}
                  className="flex items-center gap-2 rounded-lg bg-[#ffde59] px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-[#ffd700]"
                >
                  <Plus size={16} weight="bold" />
                  Nuevo
                </button>
              </div>

              <div className="relative">
                <MagnifyingGlass
                  size={16}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Buscar contactos..."
                  value={contactFilter}
                  onChange={(e) => setContactFilter(e.target.value)}
                  className="w-full rounded-lg border border-[#222] bg-[#181818] py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                />
              </div>

              {/* Formulario de creación/edición */}
              <AnimatePresence>
                {(isCreatingContact || editingContact) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-lg border border-[#ffde59]/30 bg-[#181818] p-3"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="flex-1 rounded border border-[#222] bg-[#0a0a0a] px-2.5 py-1.5 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="flex-1 rounded border border-[#222] bg-[#0a0a0a] px-2.5 py-1.5 text-sm text-white placeholder:text-slate-500 focus:border-[#ffde59] focus:outline-none"
                      />
                      <button
                        onClick={editingContact ? handleUpdateContact : handleCreateContact}
                        className="rounded bg-[#ffde59] px-3 py-1.5 text-sm font-medium text-black hover:bg-[#ffd700]"
                      >
                        {editingContact ? "Guardar" : "Crear"}
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="rounded border border-[#222] bg-[#0a0a0a] px-3 py-1.5 text-sm font-medium text-slate-400 hover:border-[#333] hover:text-white"
                      >
                        Cancelar
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                {filteredContacts.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="group flex items-center justify-between rounded border border-[#222] bg-[#181818] px-3 py-2 transition-all hover:border-[#333] hover:bg-[#1a1a1a]"
                  >
                    <div className="flex flex-1 items-center gap-3 min-w-0">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-[#ffde59]/10 text-[#ffde59]">
                        <User size={14} weight="duotone" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                        </div>
                        <p className="text-xs text-slate-400 truncate">{contact.email}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === contact.id ? null : contact.id);
                        }}
                        className={`rounded p-1.5 text-slate-400 transition-all ${
                          openMenuId === contact.id
                            ? "bg-[#222] text-white"
                            : "hover:bg-[#222] hover:text-white"
                        }`}
                        title="Opciones"
                      >
                        <DotsThree size={16} weight="bold" />
                      </button>
                      <AnimatePresence>
                        {openMenuId === contact.id && (
                          <>
                            {/* Backdrop para cerrar al hacer clic fuera */}
                            <div
                              className="fixed inset-0 z-[5]"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -5 }}
                              transition={{ duration: 0.15 }}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-9 z-10 w-36 overflow-hidden rounded-lg border border-[#333] bg-[#1a1a1a] shadow-xl shadow-black/50 backdrop-blur-sm"
                            >
                              <button
                                onClick={() => {
                                  startEditing(contact);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-slate-200 transition-colors hover:bg-[#222]"
                              >
                                <PencilSimpleLine size={16} weight="duotone" />
                                <span>Editar</span>
                              </button>
                              <div className="h-px bg-[#222]" />
                              <button
                                onClick={() => {
                                  handleDeleteContact(contact.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-slate-200 transition-colors hover:bg-[#222]"
                              >
                                <Trash size={16} weight="duotone" />
                                <span>Eliminar</span>
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
                {filteredContacts.length === 0 && (
                  <div className="rounded-lg border border-[#222] bg-[#181818] p-8 text-center">
                    <UsersThree size={32} className="mx-auto mb-2 text-slate-600" />
                    <p className="text-sm text-slate-400">No hay contactos disponibles</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sistema de Alertas Personalizado */}
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 right-4 z-50 w-full max-w-md"
          >
            <div
              className={`rounded-lg border shadow-xl backdrop-blur-sm ${
                alert.type === "success"
                  ? "border-green-500/30 bg-green-500/10"
                  : alert.type === "error"
                  ? "border-red-500/30 bg-red-500/10"
                  : alert.type === "warning"
                  ? "border-yellow-500/30 bg-yellow-500/10"
                  : "border-blue-500/30 bg-blue-500/10"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 rounded-full p-2 ${
                      alert.type === "success"
                        ? "bg-green-500/20 text-green-400"
                        : alert.type === "error"
                        ? "bg-red-500/20 text-red-400"
                        : alert.type === "warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {alert.type === "success" ? (
                      <CheckCircle size={20} weight="duotone" />
                    ) : alert.type === "error" ? (
                      <XCircle size={20} weight="duotone" />
                    ) : alert.type === "warning" ? (
                      <Warning size={20} weight="duotone" />
                    ) : (
                      <Warning size={20} weight="duotone" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">{alert.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{alert.message}</p>
                    {alert.type === "confirm" && (
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={alert.onConfirm}
                          className="flex-1 rounded bg-[#ffde59] px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-[#ffd700]"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={alert.onCancel}
                          className="flex-1 rounded border border-[#222] bg-[#0a0a0a] px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-[#111]"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                  {alert.type !== "confirm" && (
                    <button
                      onClick={() => removeAlert(alert.id)}
                      className="flex-shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <X size={16} weight="bold" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Auto-cerrar alertas que no son confirm */}
      {alerts.length > 0 && alerts[0].type !== "confirm" && (
        <AutoCloseAlert alertId={alerts[0].id} onClose={removeAlert} />
      )}
    </div>
  );
};

// Componente para auto-cerrar alertas
const AutoCloseAlert: React.FC<{
  alertId: string;
  onClose: (id: string) => void;
}> = ({ alertId, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(alertId);
    }, 4000);

    return () => clearTimeout(timer);
  }, [alertId, onClose]);

  return null;
};

export default AdminPage;

