package com.spring.weatherman;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.spring.weatherman.models.Forecast;
import com.spring.weatherman.models.ForecastDay;
import lombok.experimental.UtilityClass;
import org.springframework.http.ResponseEntity;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@UtilityClass
public class ParserUtil {
    public Forecast parseWeatherApi(ResponseEntity<Object> response) {

        Object responseBody = response.getBody();

        Gson gson = new Gson();

        JsonObject jsonObject = JsonParser.parseString(gson.toJson(responseBody)).getAsJsonObject();

        JsonArray coreElement = jsonObject.getAsJsonObject("forecast").getAsJsonArray("forecastday");

        List<ForecastDay> listOfForecastDay = new ArrayList<>();
        coreElement.forEach(jsonElement -> {
            ForecastDay forecastDay = new ForecastDay();
            forecastDay.setDate(jsonElement.getAsJsonObject().get("date").getAsString());
            forecastDay.setAvgtemp_c(jsonElement.getAsJsonObject().get("day").getAsJsonObject().get("avgtemp_c").getAsDouble());
            forecastDay.setTotalprecip_mm(jsonElement.getAsJsonObject().get("day").getAsJsonObject().get("totalprecip_mm").getAsDouble());
            listOfForecastDay.add(forecastDay);
        });

        Forecast forecast = new Forecast();
        forecast.setForecastday(listOfForecastDay);

        return forecast;
    }

    public Forecast parseRapidApi(ResponseEntity<Object> response) {

        Object responseBody = response.getBody();

        Gson gson = new Gson();

        JsonObject jsonObject = JsonParser.parseString(gson.toJson(responseBody)).getAsJsonObject();

        JsonArray coreElement = jsonObject.getAsJsonArray("list");

        List<ForecastDay> listOfForecastDay = new ArrayList<>();
        coreElement.forEach(jsonElement -> {

            double min = jsonElement.getAsJsonObject().get("temp").getAsJsonObject().get("min").getAsDouble();
            double max = jsonElement.getAsJsonObject().get("temp").getAsJsonObject().get("max").getAsDouble();

            long date = jsonElement.getAsJsonObject().get("dt").getAsLong();

            ForecastDay forecastDay = new ForecastDay();
            forecastDay.setDate(formatDate(date));
            forecastDay.setAvgtemp_c(calcAverage(min, max));
            if (jsonElement.getAsJsonObject().get("rain") == null) {
                forecastDay.setTotalprecip_mm(0.0);
            } else {
                forecastDay.setTotalprecip_mm(jsonElement.getAsJsonObject().get("rain").getAsDouble());
            }
            listOfForecastDay.add(forecastDay);
        });

        Forecast forecast = new Forecast();
        forecast.setForecastday(listOfForecastDay);

        return forecast;
    }


    private String formatDate(long seconds) {

        long millis = seconds * 1000;

        Date date = new Date(millis);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }


    private double calcAverage(double min, double max) {
        double average = (max+min)/2;
        double averageCls = average - 273.15;
        return Math.round(averageCls*10)/10D;
    }
}
