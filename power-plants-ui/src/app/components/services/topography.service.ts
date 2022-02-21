import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopographyService {
  topoDataURL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json';
  countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
  plantInfoUrl = 'http://localhost:8080/powerplants/data/plants';
  powerGenerationInfoUrl = 'http://localhost:8080/powerplants/generation';

  constructor(private http: HttpClient) { }

  getTopographyData(): Observable<any> {
    return this.http.get(this.topoDataURL);
  }

  getCountyData(): Observable<any> {
    return this.http.get(this.countyURL);
  }

  getPlantDataSynchronous() {
    return this.http.get(this.plantInfoUrl);
  }
  
  getPowerPlanInfo(): Observable<any> {
    return this.http.get(this.plantInfoUrl);
  }

  getPowerGenerationInfo(): Observable<any> {
    return this.http.get(this.powerGenerationInfoUrl);
  }
}
