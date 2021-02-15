package com.example.demo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DemoApplication

fun main(args: Array<String>) {
	runApplication<DemoApplication>(*args)
}

@RestController
class GreetingController {
    val counter = AtomicLong()
    
    @GetMapping("/greeting")
    fun greeting(@RequestParam(value = "name", defaultValue = "World") name: String): Greeting {
        val envVar: String = System.getenv("EXAMPLE_VALUE") ?: "default_value"
        return Greeting(counter.incrementAndGet(), "Hello, $name", envVar)
    }
}