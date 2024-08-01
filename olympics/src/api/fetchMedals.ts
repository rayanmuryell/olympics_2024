export interface Medal {
    country: {
      name: string;
      code: string;
    };
    medals: {
      gold: number;
      silver: number;
      bronze: number;
      total: number;
    };
    rank: number;
  }
  
  interface ApiResponse {
    results: Medal[];
    last_updated: string;
  }
  
  export const fetchMedals = async (): Promise<ApiResponse> => {
    const response = await fetch("https://api.olympics.kevle.xyz/medals");
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados das medalhas!");
    }
    return response.json();
  };
  