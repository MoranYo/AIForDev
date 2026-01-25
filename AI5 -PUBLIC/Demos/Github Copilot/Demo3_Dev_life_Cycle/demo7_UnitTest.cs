using System;
using System.IO;
using Xunit;

public class Demo7UnitTest
{
    [Fact]
    public void Add_ShouldPrintCorrectSum()
    {
        // Arrange
        int a = 3;
        int b = 5;
        string expectedOutput = "8" + Environment.NewLine;

        using (var sw = new StringWriter())
        {
            Console.SetOut(sw);

            // Act
            Add(a, b);

            // Assert
            Assert.Equal(expectedOutput, sw.ToString());
        }
    }

    // Method under test
    static void Add(int a, int b)
    {
        Console.WriteLine(a + b);
    }
}