import React, { useState, useMemo } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { ItemCard, type Item } from "@/components/ItemCard";
import { TuitionCard, type Tuition } from "@/components/TuitionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const mockItems: Item[] = [
  {
    id: "1",
    name: "Calculus Textbook",
    description: "Stewart Calculus 8th Edition - barely used, great condition!",
    type: "swap",
    condition: "good",
    category: "textbooks",
    location: "Engineering Building",
    images: [],
    status: "available",
    user: { id: "1", name: "Alice Johnson" },
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Gaming Laptop",
    description: "Dell XPS 15 with RTX 3060. Perfect for CS students!",
    type: "exchange",
    condition: "good",
    category: "electronics",
    location: "Computer Science Building",
    images: [],
    status: "available",
    user: { id: "2", name: "Bob Smith" },
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "3",
    name: "Chemistry Lab Goggles",
    description: "Brand new safety goggles, never used. Free to good home!",
    type: "donate",
    condition: "new",
    category: "supplies",
    location: "Chemistry Building",
    images: [],
    status: "available",
    user: { id: "3", name: "Carol Williams" },
    createdAt: "2024-01-17T09:15:00Z",
  },
];

const mockTuitions: Tuition[] = [
  {
    id: "1",
    salary: 25,
    daysPerWeek: 2,
    class: "MATH 101",
    subject: "Calculus I",
    location: "Library Study Room",
    description:
      "Experienced tutor with 3+ years helping students excel in calculus.",
    user: { id: "4", name: "David Lee" },
    createdAt: "2024-01-15T11:00:00Z",
    status: "available",
  },
  {
    id: "2",
    salary: 30,
    daysPerWeek: 3,
    class: "CS 102",
    subject: "Programming Fundamentals",
    location: "Online/Campus",
    description: "Learn Python and Java from scratch. Perfect for beginners!",
    user: { id: "5", name: "Emma Davis" },
    createdAt: "2024-01-16T16:00:00Z",
    status: "available",
  },
];

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    condition: "",
    status: "",
    type: "",
  });
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    return mockItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !filters.category ||
        filters.category === "all" ||
        item.category === filters.category;
      const matchesLocation =
        !filters.location || item.location.includes(filters.location);
      const matchesCondition =
        !filters.condition ||
        filters.condition === "all" ||
        item.condition === filters.condition;
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesType =
        !filters.type || filters.type === "all" || item.type === filters.type;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesCondition &&
        matchesStatus &&
        matchesType
      );
    });
  }, [searchTerm, filters]);

  const filteredTuitions = useMemo(() => {
    return mockTuitions.filter((tuition) => {
      const matchesSearch =
        tuition.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tuition.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tuition.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false);
      const matchesLocation =
        !filters.location || tuition.location.includes(filters.location);

      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, filters.location]);

  const handleMessage = (id: string) => {
    console.log("Message item/tuition:", id);
    // Navigate to messages with this item/tuition
  };

  const handleRequest = (id: string) => {
    console.log("Request item/tuition:", id);
    // Create swap request
  };

  const handleWishlist = (itemId: string) => {
    setWishlist((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Layout user={user}>
      <Header title="UniSwap" subtitle="Discover amazing finds on campus" />

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          placeholder="Search items, tutoring..."
          className="input-cute pl-12 pr-16 h-12 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          size="sm"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2"
        >
          <Filter size={18} className="mr-2" />
          Filter
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <Select
          value={filters.type}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger className="w-40 h-10">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="donate">Donate</SelectItem>
            <SelectItem value="swap">Swap</SelectItem>
            <SelectItem value="exchange">Exchange</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger className="w-40 h-10">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="textbooks">Textbooks</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="supplies">Supplies</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.condition}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, condition: value }))
          }
        >
          <SelectTrigger className="w-40 h-10">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md">
          <TabsTrigger value="items">
            Items ({filteredItems.length})
          </TabsTrigger>
          <TabsTrigger value="tutoring">
            Tutoring ({filteredTuitions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg">
              <p className="text-muted-foreground mb-6 text-lg">
                No items found
              </p>
              <Link to="/post/item">
                <Button className="btn-primary text-lg px-8 py-3">
                  <Plus size={20} className="mr-3" />
                  Post an Item
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onMessage={handleMessage}
                  onRequest={handleRequest}
                  onWishlist={handleWishlist}
                  isWishlisted={wishlist.includes(item.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tutoring" className="space-y-6">
          {filteredTuitions.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg">
              <p className="text-muted-foreground mb-6 text-lg">
                No tutoring offers found
              </p>
              <Link to="/post/tuition">
                <Button className="btn-primary text-lg px-8 py-3">
                  <Plus size={20} className="mr-3" />
                  Offer Tutoring
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredTuitions.map((tuition) => (
                <TuitionCard
                  key={tuition.id}
                  tuition={tuition}
                  onMessage={handleMessage}
                  onRequest={handleRequest}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Desktop Action Bar */}
      <div className="fixed bottom-8 right-8 flex gap-4">
        <Link to="/post/item">
          <Button className="btn-secondary shadow-lg px-6 py-3">
            <Plus size={20} className="mr-2" />
            Post Item
          </Button>
        </Link>
        <Link to="/post/tuition">
          <Button className="btn-primary shadow-lg px-6 py-3">
            <Plus size={20} className="mr-2" />
            Offer Tutoring
          </Button>
        </Link>
      </div>
    </Layout>
  );
};
