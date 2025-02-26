# 🚀 Next.js + Prisma + NextAuth Template

Ce template est une base Next.js avec **NextAuth.js** pour l'authentification et **Prisma** pour la gestion de la base de données. Il inclut déjà l'inscription et la connexion avec un système de session.

---

## 📦 **Dépendances installées**

### ✅ **Dépendances principales**
- `next@15.1.7`
- `react@19.0.0`
- `react-dom@19.0.0`
- `next-auth@4.24.11`
- `@next-auth/prisma-adapter@1.0.7`
- `@prisma/client@6.4.1`
- `@tanstack/react-query@5.66.9`
- `bcryptjs@3.0.2`
- `react-icons@5.5.0`
- `zod@3.24.2`

### 🔧 **Dépendances de développement**
- `eslint@9`
- `eslint-config-next@15.1.7`
- `postcss@8`
- `tailwindcss@3.4.1`
- `prisma@6.4.1`
- `typescript@5`
- `@types/node@20`
- `@types/react@19`
- `@types/react-dom@19`

---

## 🔐 **NextAuth.js (Connexion & Inscription déjà configurés)**

Ce template intègre **NextAuth.js** avec un **Credential Provider** et **Prisma Adapter** pour la gestion des utilisateurs.  
L’authentification inclut :
- **Inscription (`register`)**
- **Connexion (`login`)**
- **Sessions persistantes (JWT)**
- **Middleware Next.js pour protéger certaines routes**

---

## 🛠 **Variables d’environnement (`.env`)**

Ce template nécessite ces variables d’environnement :  
```ini
DATABASE_URL="mysql://root:root@localhost:3306/todo_list"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-client-secret"
```
## 🔐 **Générer un `NEXTAUTH_SECRET` sécurisé**

`NEXTAUTH_SECRET` est une clé secrète utilisée par **NextAuth.js** pour sécuriser l'authentification et la gestion des sessions.  
Voici comment générer une clé sécurisée avec **Node.js**.

## ✅ **1. Générer une clé avec Node.js**
Dans votre terminal, exécutez la commande suivante :

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
---

## 🔧 Configuration de la base de données

Remplace **`todo_list`** par le nom de votre base de données et **`mysql`** par votre système de gestion de base de données si nécessaire. 

Remplace le **`port`** si nécessaire.

Si vous modifiez le type de base de données, assurez-vous également de mettre à jour la configuration dans **`prisma/schema.prisma`**.

---

## 📂 Modèles Prisma

Le fichier **`prisma/schema.prisma`** définit les modèles de base pour l'application.  
Par défaut, ce template inclut **les modèles nécessaires à l'authentification avec NextAuth.js**, ainsi qu'un modèle **exemple** (`Task`) qui peut être modifié selon vos besoins.

### 🛠 **Modèles disponibles**

#### 🔹 **`User`** (Utilisateur)
Ce modèle représente un utilisateur et inclut :
- Un **id** unique (`UUID`).
- Un **email** unique et un **mot de passe**.
- Un **nom** et une **date de création**.
- **Relations** avec les sessions, les comptes tiers (OAuth) et les tâches (`Task`, qui peut être modifié).

#### 🔹 **`Session`** (Session utilisateur)
Gère les sessions actives avec NextAuth.js :
- Utilise un **sessionToken** unique.
- Contient une **date d’expiration**.
- Relie la session à un **utilisateur** (`User`).

#### 🔹 **`Account en commentaire si vous voulez l'ajouter`** (Comptes OAuth)
Stocke les informations des connexions avec des services externes (`Google, GitHub, etc.`) :
- Type et fournisseur (`provider`).
- Jetons d'accès et d'actualisation (`access_token`, `refresh_token`).
- Expiration du jeton et d'autres informations OAuth.

#### 🔹 **`Task`** (Exemple de modèle personnalisé)
Le modèle **`Task`** est fourni comme **exemple** et peut être modifié ou remplacé selon vos besoins :
```prisma
model Task {
  id        String   @id @default(uuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
}
```
---

## 📂 **Structure du projet**
- **lib/auth.ts → Configuration de NextAuth.js**
- **lib/prisma.ts → Client Prisma**
- **api/auth/[...nextauth]/route.ts → API NextAuth**
- **components/SessionProvider.tsx → Gestion du contexte NextAuth**
- **app/login/page.tsx → Formulaire de connexion**
- **app/register/page.tsx → Formulaire d'inscription**

---

