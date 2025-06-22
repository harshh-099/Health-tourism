package com.example.health_tourism.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String desc;
    private String location;
    private String category;
    private String establish;
    private BigDecimal price;

    private String country;
    private String contact;
    private String State;
    private String City;

    @Column(length = 2048)
    private String map;

    @Column(length = 2048)
    private String imageUrl;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDesc() { return desc; }
    public void setDesc(String desc) { this.desc = desc; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getEstablish() { return establish; }
    public void setEstablish(String establish) { this.establish = establish; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCountry() {return country;}
    public void setCountry(String country) {this.country = country;}

    public String getContact() {return contact;}
    public void setContact(String contact) {this.contact = contact;}

    public String getMap() {return map;}
    public void setMap(String map) {this.map = map;}


    public String getImageUrl() {return imageUrl;}
    public void setImageUrl(String imageUrl) {this.imageUrl = imageUrl;}

    public String getState() {return State;}
    public void setState(String State) {this.State = State;}


    public String getCity() {return City;}
    public void setCity(String City) {this.City = City;}
}
