import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl: string = 'http://localhost:8080/api';
  private fetchStatesPowerInfoUrl: string = this.baseUrl + '/power/generation/info';
  private findTopNPowerGenerationUrl: string = this.baseUrl + '/power/generation/';
  private fetchAllPowerPlantsUrl: string = this.baseUrl + '/power/plant/info';
  private findPowerPlantsByStateUrl: string = this.baseUrl + '/power/plant/';

  constructor(private http: HttpClient) { }

  getPowerGenerationInfo(): Observable<any> {
    return this.http.get(this.fetchStatesPowerInfoUrl);
  }

  getPowerPlantInfo(): Observable<any> {
    return this.http.get(this.fetchAllPowerPlantsUrl);
  }

  getTopNPowerGenerationStates(topN: number): Observable<any> {
    return this.http.get(this.findTopNPowerGenerationUrl + topN);
  }

  getPowerPlantsByState(stateCode: string): Observable<any> {
    return this.http.get(this.findPowerPlantsByStateUrl + stateCode);
  }
}
