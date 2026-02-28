import axios from "axios";
import { User } from "../types/user";

// Fetch users from JSONPlaceholder
const fetchJsonPlaceholder = async (): Promise<any[]> => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  } catch {
    return [];
  }
};

// Fetch users from DummyJSON
const fetchDummyJson = async (): Promise<any[]> => {
  try {
    const res = await axios.get("https://dummyjson.com/users");
    return res.data.users || [];
  } catch {
    return [];
  }
};

// Fetch users from Reqres
const fetchReqres = async (): Promise<any[]> => {
  const urls = [
    "https://reqres.in/api/users?page=1",
    "https://reqres.in/api/users?page=2",
  ];
  try {
    const results = await Promise.all(
      urls.map((u) => axios.get(u).then((r) => r.data).catch(() => null))
    );
    const users: any[] = [];
    for (const data of results) {
      if (data && Array.isArray(data.data)) users.push(...data.data);
    }
    return users;
  } catch {
    return [];
  }
};

const normalize = (items: any[], source: string): User[] => {
  return items.map((it: any, idx: number) => {
    // Construct name & email depending on source
    let name = it.name || `${it.firstName || it.first_name || ""} ${it.lastName || it.last_name || ""}`.trim();
    if (!name) name = it.username || it.email || `User ${source}-${idx}`;

    const user: User = {
      id: Number(it.id) || Math.floor(Math.random() * 1000000),
      name,
      email: it.email || it.emailAddress || it.email_address || "",
      username: it.username || it.userName || it.firstName || undefined,
      phone: it.phone || it.phoneNumber || undefined,
      website: it.website || undefined,
      company: it.company || (it.companyName ? { name: it.companyName, catchPhrase: "", bs: "" } : undefined),
      avatar: it.avatar || it.image || undefined,
      source,
    };

    return user;
  });
};

export const getCombinedUsers = async (): Promise<User[]> => {
  const [jp, dj, rr] = await Promise.allSettled([fetchJsonPlaceholder(), fetchDummyJson(), fetchReqres()]);

  const jpUsers = jp.status === "fulfilled" ? normalize(jp.value, "jsonplaceholder") : [];
  const djUsers = dj.status === "fulfilled" ? normalize(dj.value, "dummyjson") : [];
  const rrUsers = rr.status === "fulfilled" ? normalize(rr.value, "reqres") : [];

  // Merge and dedupe by email when possible
  const map = new Map<string, User>();
  const all = [...jpUsers, ...djUsers, ...rrUsers];
  let nextId = 1;
  for (const u of all) {
    const key = (u.email || u.name || "")?.toLowerCase();
    if (key && map.has(key)) continue;
    // assign sequential id to avoid collisions
    u.id = nextId++;
    map.set(key || `${u.source}-${u.id}`, u);
  }

  return Array.from(map.values());
};

export default getCombinedUsers;