package com.spring.weatherman;

import com.spring.weatherman.models.Forecast;
import com.spring.weatherman.models.ForecastDay;
import com.spring.weatherman.models.RequestData;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@EnableFeignClients
public class WeathermanController {
    private final ApiService proxy;

    public WeathermanController(ApiService proxy) {
        this.proxy = proxy;
    }

    @GetMapping("/")
    public String status() {
        return "Hello World!";
    }

    @PostMapping("/api/weatherapi")
    public List<ForecastDay> getForecastV3(@RequestBody RequestData data) {
        String latLng = data.getLatitude() +","+ data.getLongitude();
        String range = String.valueOf(data.getRange());

        URI uri = URI.create("https://api.weatherapi.com/v1");
        var response = proxy.getForecast(uri, "d6f87478e0d44737a03205356221304", latLng, range);
        Forecast a = ParserUtil.parseWeatherApi(response);
        return a.getForecastday();
    }

    @PostMapping("/api/rapidapi")
    public List<ForecastDay> getForecastV4(@RequestBody RequestData data) {

        String lat = String.valueOf(data.getLatitude());
        String lng = String.valueOf(data.getLongitude());
        String range = String.valueOf(data.getRange());

        URI uri = URI.create("https://community-open-weather-map.p.rapidapi.com");
        ResponseEntity<Object> response = proxy.getForecastRapidApi(uri, "55d57da2bcmsh5838cbf18a879afp1b098ajsnd301c57fca30", lat, lng, range);
        Forecast a = ParserUtil.parseRapidApi(response);

        return a.getForecastday();
    }
}
