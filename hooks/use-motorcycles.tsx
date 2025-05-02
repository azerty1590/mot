"use client"

import { useEffect, useState } from "react"
import type { Motorcycle } from "@/types"

export function useMotorcycles() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMotorcycles = async () => {
      try {
        // Check if IndexedDB is supported
        if (!("indexedDB" in window)) {
          console.error("IndexedDB not supported")
          setIsLoading(false)
          return
        }

        const db = await openDatabase()
        const storedMotorcycles = await getAllMotorcycles(db)
        setMotorcycles(storedMotorcycles)
      } catch (error) {
        console.error("Error loading motorcycles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMotorcycles()
  }, [])

  const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("MotoMaintainDB", 1)

      request.onerror = () => reject(request.error)

      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains("motorcycles")) {
          db.createObjectStore("motorcycles", { keyPath: "id" })
        }
      }

      request.onsuccess = () => resolve(request.result)
    })
  }

  const getAllMotorcycles = (db: IDBDatabase): Promise<Motorcycle[]> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("motorcycles", "readonly")
      const store = transaction.objectStore("motorcycles")
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  const addMotorcycle = async (motorcycle: Motorcycle): Promise<void> => {
    try {
      const db = await openDatabase()
      const transaction = db.transaction("motorcycles", "readwrite")
      const store = transaction.objectStore("motorcycles")

      await new Promise<void>((resolve, reject) => {
        const request = store.add(motorcycle)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
      })

      setMotorcycles((prev) => [...prev, motorcycle])
    } catch (error) {
      console.error("Error adding motorcycle:", error)
      throw error
    }
  }

  const updateMotorcycle = async (motorcycle: Motorcycle): Promise<void> => {
    try {
      const db = await openDatabase()
      const transaction = db.transaction("motorcycles", "readwrite")
      const store = transaction.objectStore("motorcycles")

      await new Promise<void>((resolve, reject) => {
        const request = store.put(motorcycle)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
      })

      setMotorcycles((prev) => prev.map((m) => (m.id === motorcycle.id ? motorcycle : m)))
    } catch (error) {
      console.error("Error updating motorcycle:", error)
      throw error
    }
  }

  const deleteMotorcycle = async (id: string): Promise<void> => {
    try {
      const db = await openDatabase()
      const transaction = db.transaction("motorcycles", "readwrite")
      const store = transaction.objectStore("motorcycles")

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(id)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
      })

      setMotorcycles((prev) => prev.filter((m) => m.id !== id))
    } catch (error) {
      console.error("Error deleting motorcycle:", error)
      throw error
    }
  }

  const getMotorcycle = async (id: string): Promise<Motorcycle | null> => {
    try {
      const db = await openDatabase()
      const transaction = db.transaction("motorcycles", "readonly")
      const store = transaction.objectStore("motorcycles")

      return await new Promise<Motorcycle | null>((resolve, reject) => {
        const request = store.get(id)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result || null)
      })
    } catch (error) {
      console.error("Error getting motorcycle:", error)
      return null
    }
  }

  return {
    motorcycles,
    isLoading,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
    getMotorcycle,
  }
}
