package com.spring.weatherman;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.net.URI;

@FeignClient(name = "api-service", url = "https://this-is-a-placeholder.com")
public interface ApiService {

    @GetMapping("/forecast.json?key={apiKey}&q={latLng}&days={range}")
    ResponseEntity<Object> getForecast(URI baseUri, @PathVariable("apiKey") String apiKey, @PathVariable String latLng, @PathVariable String range);

    @GetMapping("/forecast/daily?rapidapi-key={apiKey}&lat={lat}&lon={lng}&cnt={range}")
    ResponseEntity<Object> getForecastRapidApi(URI baseUri, @PathVariable("apiKey") String apikey, @PathVariable String lat, @PathVariable String lng, @PathVariable String range);
}